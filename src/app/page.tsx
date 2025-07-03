"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConnectKitButton } from 'connectkit';

const streamCategories = [
  { id: "coding", label: "Coding", color: "bg-blue-500/20 border-blue-500/50" },
  { id: "design", label: "Design", color: "bg-purple-500/20 border-purple-500/50" },
  { id: "art", label: "Art", color: "bg-pink-500/20 border-pink-500/50" },
];

// Helper function to determine stream type based on creator and content
const getStreamType = (creator: string, name: string, tags: string[]) => {
  if (creator === "@baseddev" || name.toLowerCase().includes("coding") || name.toLowerCase().includes("vibe")) {
    return "coding";
  }
  if (creator === "@designbase" || tags.some(tag => ["AI", "CONTENT", "VIDEO", "GENERATION"].includes(tag))) {
    return "design";
  }
  return "art";
};

// Helper function to generate project ID
const generateProjectId = (name: string, index: number) => {
  const shortName = name.split(" ").slice(0, 2).join("_").toUpperCase();
  return `PROJECT_${(index + 1).toString().padStart(2, '0')}.${shortName}.BASE`;
};

const basedFolksData = [
  {
    name: "Akhil",
    role: "Smart Contract Developer",
    description: "Building the future of DeFi on Base chain",
    skills: ["Solidity", "React", "Node.js"],
    image: "akhil.jpg",
    xUrl: "https://x.com/akhil_bvs"
  },
  {
    name: "Siddhesh",
    role: "UI/UX Designer",
    description: "Crafting beautiful Web3 experiences",
    skills: ["Figma", "React", "Design Systems"],
    image: "siddesh.jpg",
    xUrl: "https://x.com/0xSiddesh"
  },
  {
    name: "Nisarg",
    role: "Full Stack Developer",
    description: "Creating seamless dApps on Base",
    skills: ["TypeScript", "Next.js", "Smart Contracts"],
    image: "nisarg.jpg",
    xUrl: "https://x.com/itznishuu_"
  },
  {
    name: "Yashika",
    role: "Digital Artist",
    description: "Creating stunning NFT collections",
    skills: ["Photoshop", "Illustrator", "3D Art"],
    image: "yashika.jpg",
    xUrl: "https://x.com/YashikaChugh4"
  },
  {
    name: "Naman",
    role: "Blockchain Developer",
    description: "Building innovative Base applications",
    skills: ["Web3", "Solidity", "DeFi"],
    image: "naman.jpg",
    xUrl: "https://x.com/shirollsasaki"
  },
  {
    name: "Ahaan",
    role: "Product Manager",
    description: "Driving product strategy for Base ecosystem",
    skills: ["Product Strategy", "Analytics", "User Research"],
    image: "ahaan.jpg",
    xUrl: "https://x.com/AhaanRaizada"
  },
  {
    name: "Bhaisaab",
    role: "DevRel Engineer",
    description: "Building developer communities on Base",
    skills: ["Community Building", "Technical Writing", "Workshops"],
    image: "bhaisaab.jpg",
    xUrl: "https://x.com/0xBhaisaab"
  },
  {
    name: "Bhavya",
    role: "AI/ML Engineer",
    description: "Integrating AI with blockchain technology",
    skills: ["Machine Learning", "Python", "TensorFlow"],
    image: "bhavya.jpg",
    xUrl: "https://x.com/bhavya_gor"
  },
  {
    name: "Gayatri",
    role: "Technical Lead",
    description: "Leading technical initiatives and architecture",
    skills: ["System Design", "Leadership", "Architecture"],
    image: "gayatri.jpg",
    xUrl: "https://x.com/gayatri_gt"
  },
  {
    name: "Ishika",
    role: "Content Creator",
    description: "Creating engaging content about Web3",
    skills: ["Content Strategy", "Video Editing", "Social Media"],
    image: "ishika.jpg",
    xUrl: "https://x.com/IshikaMukerji"
  },
  {
    name: "Kunal",
    role: "Growth Hacker",
    description: "Scaling Base projects and communities",
    skills: ["Growth Marketing", "Analytics", "Community Growth"],
    image: "kunal.jpg",
    xUrl: "https://x.com/kunalvg"
  },
  {
    name: "Samriti",
    role: "Frontend Developer",
    description: "Building beautiful user interfaces",
    skills: ["React", "CSS", "JavaScript"],
    image: "samriti.jpg",
    xUrl: "https://x.com/21centurysappho"
  },
  {
    name: "Saxenasaheb",
    role: "Backend Developer",
    description: "Creating robust server-side solutions",
    skills: ["Node.js", "Databases", "API Design"],
    image: "saxenasaheb.jpg",
    xUrl: "https://x.com/Saxenasaheb"
  },
  {
    name: "Irshad",
    role: "Business Developer",
    description: "Expanding Base ecosystem partnerships",
    skills: ["Business Development", "Partnerships", "Strategy"],
    image: "irshad.jpg",
    xUrl: "https://x.com/irshaddahmed"
  }
];

interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  creator: string;
  vibeScore: string;
  type: string;
  image: string;
  status: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("home");
  const [projectData, setProjectData] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/data');
        if (response.ok) {
          const data = await response.json();
          // Transform schedule data to project format
          const transformedData: ProjectData[] = data.schedule.map((item: any, index: number) => ({
            id: generateProjectId(item.name, index),
            title: item.name,
            description: item.description,
            tags: item.tags || [],
            creator: item.creator || "@artbase",
            vibeScore: `+${Math.floor(Math.random() * 5) + 1}`,
            type: getStreamType(item.creator || "@artbase", item.name, item.tags || []),
            image: item.image || "stream1.jpeg",
            status: item.status || "active"
          }));
          setProjectData(transformedData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to empty array if error
        setProjectData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProjects = activeCategory === "all" 
    ? projectData 
    : projectData.filter(project => project.type === activeCategory);

  const ProjectCard = ({ project }: { project: ProjectData }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-card border-2 border-border rounded-lg overflow-hidden h-[520px] flex flex-col"
    >
      {/* Terminal Header */}
      <div className="bg-muted/50 border-b border-border px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-mono text-muted-foreground truncate ml-2">{project.id}</span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Project Preview */}
        <div className="h-32 rounded-lg mb-4 overflow-hidden border border-border relative flex-shrink-0">
          <Image
            src={`/${project.image}`}
            alt="Stream preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-xl font-bold mb-1 truncate px-2">
                {project.title.split(' ')[0]}
              </div>
              <div className="text-sm opacity-90 truncate px-2">
                {project.title.split(' ').slice(1).join(' ')}
              </div>
            </div>
          </div>
        </div>

        {/* Project Info - Flexible container */}
        <div className="flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 min-h-[3.5rem]">
            {project.title}
          </h3>
          
          {/* Description with fixed height */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3 h-[4.5rem] overflow-hidden">
            {project.description}
          </p>
          
          {/* Tags - Fixed height container */}
          <div className="mb-3 h-[2.5rem] overflow-hidden">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded border border-primary/20 whitespace-nowrap">
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-mono rounded border border-border">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Creator */}
          <div className="text-sm text-muted-foreground mb-4">
            <span>CREATOR: </span>
            <span className="text-primary font-mono">{project.creator}</span>
          </div>

          {/* Spacer to push bottom content down */}
          <div className="flex-1"></div>

          {/* Execute Button - Always at bottom */}
          <div className="border-t border-border pt-3 mb-3">
            <Button 
              variant="outline" 
              className="w-full font-mono text-sm"
              disabled={project.status === "Cancelled"}
            >
              {project.status === "Cancelled" ? "&gt; CANCELLED" : 
               project.status === "Planned" ? "&gt; COMING_SOON" : 
               "&gt; WATCH_STREAM"}
            </Button>
          </div>

          {/* Vibe Score - Always at bottom */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">👍</span>
                <span className="text-sm">{Math.floor(Math.random() * 10) + 1}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500">👎</span>
                <span className="text-sm">{Math.floor(Math.random() * 3)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-green-400">Vibe Score: {project.vibeScore}</div>
              <div className="text-xs text-muted-foreground">+1 • +0</div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center mt-2">
            Connect wallet to vote on-chain
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderHome = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-8 py-16"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="font-mono text-sm text-muted-foreground mb-4">
          Directory of BASE:\BASE_CAFE\FEATURED_STREAMS
        </div>
        <h1 className="text-6xl md:text-8xl font-caveat font-bold text-primary mb-4">
          All Base Cafe
        </h1>
      </motion.div>

      {/* Category Buttons */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center gap-4 mb-16 flex-wrap"
      >
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          onClick={() => setActiveCategory("all")}
          className="font-semibold"
        >
          All Projects
        </Button>
        {streamCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="font-semibold"
          >
            {category.label}
          </Button>
        ))}
      </motion.div>

      {/* Project Cards */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {loading ? (
          // Loading state
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-card border-2 border-border rounded-lg overflow-hidden animate-pulse h-[520px] flex flex-col">
              <div className="bg-muted/50 border-b border-border px-4 py-2 h-10 flex-shrink-0"></div>
              <div className="p-6 flex flex-col flex-1">
                <div className="h-32 bg-muted rounded-lg mb-4 flex-shrink-0"></div>
                <div className="flex flex-col flex-1">
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full mb-1"></div>
                  <div className="h-4 bg-muted rounded w-2/3 mb-3"></div>
                  <div className="flex gap-2 mb-3">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="flex-1"></div>
                  <div className="h-10 bg-muted rounded mb-3"></div>
                  <div className="h-16 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-muted-foreground text-lg">
              No streams found for the selected category.
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  const renderBasedFolks = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-8 py-16"
    >
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl md:text-8xl font-caveat font-bold text-primary mb-8">
          Based Folks
        </h1>
        <div className="max-w-4xl mx-auto">
          <Input 
            placeholder="Search based folks..." 
            className="h-16 text-lg border-2 border-border bg-input font-mono"
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {basedFolksData.map((person, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(person.xUrl, '_blank')}
            className="cursor-pointer"
          >
            <Card className="border-2 border-border bg-card hover:border-primary transition-colors h-[380px] flex flex-col">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="aspect-square rounded-full mb-4 overflow-hidden border-2 border-primary/20 relative mx-auto w-32 h-32 flex-shrink-0 hover:border-primary/50 transition-colors">
                  <Image
                    src={`/${person.image}`}
                    alt={`${person.name} profile`}
                    fill
                    className="object-cover"
                  />
                  {/* X/Twitter icon overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-8 h-8 text-white">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-center mb-2 line-clamp-1">{person.name}</h3>
                  <p className="text-sm text-primary font-semibold text-center mb-3 line-clamp-1">{person.role}</p>
                  <p className="text-sm text-muted-foreground text-center mb-3 line-clamp-3 flex-1">{person.description}</p>
                  <div className="h-[2.5rem] overflow-hidden">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {person.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-muted text-xs rounded whitespace-nowrap">
                          {skill}
                        </span>
                      ))}
                      {person.skills.length > 3 && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">
                          +{person.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  const renderBehindTheScenes = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-8 py-16"
    >
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl md:text-8xl font-caveat font-bold text-primary mb-8">
          Behind the Scenes
        </h1>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        <Tabs defaultValue="gifs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="gifs" className="text-lg py-3 font-mono">Gifs</TabsTrigger>
            <TabsTrigger value="photos" className="text-lg py-3 font-mono">Photos</TabsTrigger>
            <TabsTrigger value="videos" className="text-lg py-3 font-mono">Videos</TabsTrigger>
          </TabsList>
          
          {["gifs", "photos", "videos"].map((type) => (
            <TabsContent key={type} value={type}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="h-80 border-2 border-border bg-card hover:border-primary transition-colors">
                      <CardContent className="p-6 h-full flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center text-muted-foreground border border-border">
                          <div className="text-center">
                            <div className="text-4xl mb-2">📸</div>
                            <div className="font-mono capitalize">{type} {index}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </motion.div>
  );

  const renderSupportForm = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-8 py-16"
    >
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl md:text-8xl font-caveat font-bold text-primary mb-8">
          Support Form
        </h1>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-2 border-border bg-card">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <label className="text-lg font-semibold text-primary mb-2 block font-mono">
                  Stream Request
                </label>
                <Input 
                  placeholder="Enter your stream request..." 
                  className="h-12 border-2 border-border bg-input font-mono"
                />
              </div>
              
              <div>
                <label className="text-lg font-semibold text-primary mb-2 block font-mono">
                  Contact Email
                </label>
                <Input 
                  type="email"
                  placeholder="Enter your email..." 
                  className="h-12 border-2 border-border bg-input font-mono"
                />
              </div>
              
              <div>
                <label className="text-lg font-semibold text-primary mb-2 block font-mono">
                  Description
                </label>
                <Textarea 
                  placeholder="Tell us more about your request..." 
                  className="min-h-32 border-2 border-border bg-input resize-none font-mono"
                />
              </div>
              
              <Button 
                size="lg" 
                className="w-full h-12 text-lg font-semibold hover:scale-105 transition-transform font-mono"
              >
                &gt; SUBMIT_REQUEST.BAT
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "home": return renderHome();
      case "based-folks": return renderBasedFolks();
      case "behind-scenes": return renderBehindTheScenes();
      case "support": return renderSupportForm();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/Base_Cafe_Logo.png"
              alt="All Base Cafe Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-caveat font-bold text-xl text-primary">All Base Cafe</span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6 items-center">
            <Button
              variant={activeSection === "home" ? "default" : "ghost"}
              onClick={() => setActiveSection("home")}
              className="font-semibold"
            >
              Home
            </Button>
            <Button
              variant={activeSection === "based-folks" ? "default" : "ghost"}
              onClick={() => setActiveSection("based-folks")}
              className="font-semibold"
            >
              Based Folks
            </Button>
            <Button
              variant={activeSection === "behind-scenes" ? "default" : "ghost"}
              onClick={() => setActiveSection("behind-scenes")}
              className="font-semibold"
            >
              Behind the Scenes
            </Button>
            <Button
              variant={activeSection === "support" ? "default" : "ghost"}
              onClick={() => setActiveSection("support")}
              className="font-semibold"
            >
              Support
            </Button>
            
            {/* ConnectKit Wallet Button */}
            <div className="ml-4">
              <ConnectKitButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {renderSection()}
      </div>
    </div>
  );
}
