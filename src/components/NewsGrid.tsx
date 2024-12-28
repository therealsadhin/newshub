import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye } from "lucide-react";

// Extended mock data with 50 items
const generateNewsItems = () => {
  const categories = [
    "Science journalism",
    "World news",
    "Technology",
    "Politics",
    "Business",
    "Health",
    "Entertainment",
    "Sports",
  ];

  const images = [
    "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80",
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `News Article ${i + 1}: ${Math.random().toString(36).substring(7)}`,
    description: `This is a detailed description for news article ${
      i + 1
    }. It contains important information about the topic and provides context for readers to understand the story better. The content is designed to be informative and engaging.`,
    image: images[Math.floor(Math.random() * images.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    readCount: Math.floor(Math.random() * 1000),
  }));
};

const newsItems = generateNewsItems();

export const NewsGrid = () => {
  const [items, setItems] = useState(newsItems.map(item => ({
    ...item,
    readCount: item.readCount,
  })));

  const handleReadClick = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, readCount: item.readCount + 1 } : item
      )
    );
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleReadClick(item.id)}
          >
            <CardHeader className="p-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-muted-foreground">{item.category}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>{item.readCount}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-muted-foreground line-clamp-3">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};