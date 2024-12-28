import { Header } from "@/components/Header";
import { SearchSection } from "@/components/SearchSection";
import { NewsGrid } from "@/components/NewsGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SearchSection />
        <NewsGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;