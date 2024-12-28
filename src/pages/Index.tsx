import { Header } from "@/components/Header";
import { SearchSection } from "@/components/SearchSection";
import { NewsGrid } from "@/components/NewsGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SearchSection />
        <NewsGrid />
      </main>
    </div>
  );
};

export default Index;