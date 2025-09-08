import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../lib/ui-core/components/navigation/tabs';
import { List, ListItem, ListHeader } from '../lib/ui-core/components/data/list';

export default function Tier2Demo() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("tabs-demo");

  const handleListItemClick = (value: string) => {
    setSelectedItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-12 mb-2">Tier 2 Components Demo</h1>
        <p className="text-neutral-11">Testing Tabs and List components</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 px-[0.125rem]">
          <TabsTrigger value="tabs-demo">Tabs Demo</TabsTrigger>
          <TabsTrigger value="lists-demo">Lists Demo</TabsTrigger>
          <TabsTrigger value="interactive-demo">Interactive Demo</TabsTrigger>
        </TabsList>

        <TabsContent value="tabs-demo" className="space-y-4">
          <div className="rounded-sm border border-neutral-6 p-6">
            <h2 className="text-xl font-semibold text-neutral-12 mb-4">Tabs Component</h2>
            <p className="text-neutral-11 mb-4">
              This demonstrates the Tabs component with horizontal orientation and semantic theming.
            </p>
            
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList>
                <TabsTrigger value="tab1">First Tab</TabsTrigger>
                <TabsTrigger value="tab2">Second Tab</TabsTrigger>
                <TabsTrigger value="tab3" disabled>Disabled Tab</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <div className="p-4 bg-neutral-1 rounded border">
                  <h3 className="font-medium text-neutral-12">First Tab Content</h3>
                  <p className="text-neutral-11">This is the content for the first tab.</p>
                </div>
              </TabsContent>
              <TabsContent value="tab2">
                <div className="p-4 bg-neutral-1 rounded border">
                  <h3 className="font-medium text-neutral-12">Second Tab Content</h3>
                  <p className="text-neutral-11">This is the content for the second tab.</p>
                </div>
              </TabsContent>
              <TabsContent value="tab3">
                <div className="p-4 bg-neutral-1 rounded border">
                  <p className="text-neutral-11">This tab is disabled.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>

        <TabsContent value="lists-demo" className="space-y-4">
          <div className="rounded-lg border border-neutral-6 p-6">
            <h2 className="text-xl font-semibold text-neutral-12 mb-4">List Components</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-neutral-12 mb-3">Default List</h3>
                <List variant="default" density="default">
                  <ListHeader>Fruits</ListHeader>
                  <ListItem>Apple</ListItem>
                  <ListItem>Banana</ListItem>
                  <ListItem>Orange</ListItem>
                </List>
              </div>

              <div>
                <h3 className="font-medium text-neutral-12 mb-3">Ordered List</h3>
                <List variant="ordered" density="default">
                  <ListHeader>Steps</ListHeader>
                  <ListItem>First step</ListItem>
                  <ListItem>Second step</ListItem>
                  <ListItem>Third step</ListItem>
                </List>
              </div>

              <div>
                <h3 className="font-medium text-neutral-12 mb-3">Disc List</h3>
                <List variant="disc" density="compact">
                  <ListHeader>Features</ListHeader>
                  <ListItem>Feature A</ListItem>
                  <ListItem>Feature B</ListItem>
                  <ListItem>Feature C</ListItem>
                </List>
              </div>

              <div>
                <h3 className="font-medium text-neutral-12 mb-3">Comfortable Density</h3>
                <List variant="default" density="comfortable">
                  <ListHeader>Options</ListHeader>
                  <ListItem>Option 1</ListItem>
                  <ListItem>Option 2</ListItem>
                  <ListItem>Option 3</ListItem>
                </List>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interactive-demo" className="space-y-4">
          <div className="rounded-lg border border-neutral-6 p-6">
            <h2 className="text-xl font-semibold text-neutral-12 mb-4">Interactive Lists</h2>
            <p className="text-neutral-11 mb-4">
              Click items to select them. Selected: {selectedItems.join(', ') || 'None'}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-neutral-12 mb-3">Interactive List</h3>
                <List variant="default" density="default">
                  <ListHeader>Selectable Items</ListHeader>
                  <ListItem 
                    onClick={() => handleListItemClick('item1')}
                    selected={selectedItems.includes('item1')}
                  >
                    Interactive Item 1
                  </ListItem>
                  <ListItem 
                    onClick={() => handleListItemClick('item2')}
                    selected={selectedItems.includes('item2')}
                  >
                    Interactive Item 2
                  </ListItem>
                  <ListItem 
                    onClick={() => handleListItemClick('item3')}
                    selected={selectedItems.includes('item3')}
                  >
                    Interactive Item 3
                  </ListItem>
                  <ListItem disabled>
                    Disabled Item
                  </ListItem>
                </List>
              </div>

              <div>
                <h3 className="font-medium text-neutral-12 mb-3">Vertical Tabs</h3>
                <Tabs defaultValue="vtab1" orientation="vertical" className="flex">
                  <TabsList orientation="vertical" className="mr-4 py-0.5 px-0.5">
                    <TabsTrigger value="vtab1">Vertical 1</TabsTrigger>
                    <TabsTrigger value="vtab2">Vertical 2</TabsTrigger>
                    <TabsTrigger value="vtab3">Vertical 3</TabsTrigger>
                  </TabsList>
                  <div className="flex-1">
                    <TabsContent value="vtab1" orientation="vertical">
                      <div className="p-4 bg-neutral-1 rounded border">
                        <p className="text-neutral-11">Vertical tab 1 content</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="vtab2" orientation="vertical">
                      <div className="p-4 bg-neutral-1 rounded border">
                        <p className="text-neutral-11">Vertical tab 2 content</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="vtab3" orientation="vertical">
                      <div className="p-4 bg-neutral-1 rounded border">
                        <p className="text-neutral-11">Vertical tab 3 content</p>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}