import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Mock data - in a real app, this would come from an API
const newsItems = [
  {
    id: 1,
    title: "SpaceX Successfully Launches New Satellite Constellation",
    description: "In a groundbreaking mission, SpaceX has successfully deployed a new constellation of satellites, marking a significant milestone in global internet coverage. The launch, which took place early morning, carried 60 satellites.",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&q=80",
    category: "Science journalism"
  },
  {
    id: 2,
    title: "Global Economic Summit Addresses Climate Change",
    description: "World leaders gathered at the annual Economic Summit have pledged significant resources to combat climate change. The historic agreement includes commitments to reduce carbon emissions and increase renewable energy investments.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
    category: "World news"
  },
  {
    id: 3,
    title: "Breakthrough in Quantum Computing Research",
    description: "Scientists have achieved a major breakthrough in quantum computing, successfully demonstrating a new type of qubit that remains stable at room temperature. This development could revolutionize the field of quantum computing.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
    category: "Technology"
  },
  // Add more items as needed
];

export const NewsGrid = () => {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-2">{item.category}</div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-muted-foreground line-clamp-3">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};