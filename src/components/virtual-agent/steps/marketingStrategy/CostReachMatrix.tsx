
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, TooltipProps } from 'recharts';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Info } from "lucide-react";

import { channels, categoryColors, BuyerPersona, defaultBuyerPersona, scoreFit, costLevels, reachLevels, MarketingChannel } from './channelsData';

interface CustomTooltipProps extends TooltipProps<number, string> {
  persona: BuyerPersona;
}

const CustomTooltip = ({ active, payload, persona }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;
  
  const item = payload[0].payload as MarketingChannel;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
      <p className="font-medium">{item.name}</p>
      <p className="text-sm text-muted-foreground">Categoría: {item.category}</p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <p className="text-xs text-muted-foreground">Coste</p>
          <p className="text-sm">{costLevels[item.cost-1].description}</p>
          <p className="text-xs text-muted-foreground">{costLevels[item.cost-1].range}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Alcance</p>
          <p className="text-sm">{reachLevels[item.reach-1].description}</p>
          <p className="text-xs text-muted-foreground">{reachLevels[item.reach-1].range}</p>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm">Fit para tu perfil: {scoreFit(item, persona)}</p>
      </div>
    </div>
  );
};

const CostReachMatrix: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(categoryColors));
  const [maxCost, setMaxCost] = useState(4);
  const [persona, setPersona] = useState<BuyerPersona>(defaultBuyerPersona);
  const [showOrganic, setShowOrganic] = useState(false);
  
  // Filter channels based on selections
  const filteredChannels = channels.filter(channel => 
    selectedCategories.includes(channel.category) && 
    channel.cost <= maxCost &&
    (!showOrganic || (showOrganic && channel.cost === 1))
  );
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Get unique categories
  const categories = [...new Set(channels.map(c => c.category))];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">Filtrar por categoría</h4>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-md p-1">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Escala unificada</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Coste:</strong> 1 (Muy bajo) → 4 (Alto)</p>
                  <p><strong>Alcance:</strong> 1 (Nicho local) → 4 (Masivo)</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <div
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 text-xs rounded-full cursor-pointer border transition-colors flex items-center gap-1 
                ${selectedCategories.includes(category) 
                  ? 'border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800' 
                  : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 opacity-50'}`}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: categoryColors[category] }}
              />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">Nivel máximo de coste</h4>
          <span className="text-sm text-muted-foreground">{costLevels[maxCost-1].description}</span>
        </div>
        <Slider 
          value={[maxCost]} 
          min={1} 
          max={4} 
          step={1} 
          onValueChange={(value) => setMaxCost(value[0])}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          {costLevels.map(level => (
            <span key={level.level}>{level.level}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="organic" 
          checked={showOrganic}
          onCheckedChange={(checked) => setShowOrganic(checked === true)}
        />
        <label 
          htmlFor="organic" 
          className="text-sm font-medium leading-none cursor-pointer"
        >
          Solo canales sin presupuesto
        </label>
      </div>

      <div className="border rounded-md p-1">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 50, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              type="number" 
              dataKey="cost" 
              name="Coste" 
              domain={[0.5, 4.5]} 
              ticks={[1, 2, 3, 4]} 
              label={{ value: 'Coste', position: 'bottom', offset: 20 }}
            />
            <YAxis 
              type="number" 
              dataKey="reach" 
              name="Alcance" 
              domain={[0.5, 4.5]} 
              ticks={[1, 2, 3, 4]} 
              label={{ value: 'Alcance', angle: -90, position: 'left' }}
            />
            <Tooltip content={<CustomTooltip persona={persona} />} />
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px', bottom: '0px' }}
            />
            {categories.filter(cat => selectedCategories.includes(cat)).map(category => (
              <Scatter 
                key={category}
                name={category}
                data={filteredChannels.filter(c => c.category === category)}
                fill={categoryColors[category]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-xs text-muted-foreground">
        <p>Nota: Los datos están basados en precios públicos y estimaciones de alcance 2024-25.</p>
      </div>
    </div>
  );
};

export default CostReachMatrix;
