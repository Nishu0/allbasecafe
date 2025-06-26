"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const streamCategories = [
  { id: "coding", label: "Coding", color: "bg-blue-500/20 border-blue-500/50" },
  { id: "design", label: "Design", color: "bg-purple-500/20 border-purple-500/50" },
  { id: "art", label: "Art", color: "bg-pink-500/20 border-pink-500/50" },
];

const projectData = [
  {
    id: "PROJECT_01.EXE",
    title: "Base Dev Streams",
    description: "Live coding sessions focused on Base blockchain development and smart contract creation.",
    tags: ["SOLIDITY", "BASE", "SMART CONTRACTS"],
    creator: "@baseddev",
    vibeScore: "+3",
    type: "coding"
  },
  {
    id: "PROJECT_02.EXE", 
    title: "UI/UX Design Lab",
    description: "Creating modern and intuitive interfaces for decentralized applications on Base.",
    tags: ["DESIGN", "UI/UX", "FIGMA", "WEB3"],
    creator: "@designbase",
    vibeScore: "+2",
    type: "design"
  },
  {
    id: "PROJECT_03.EXE",
    title: "NFT Art Creation",
    description: "Digital art streams creating unique NFT collections for the Base ecosystem.",
    tags: ["NFT", "DIGITAL ART", "BASE", "CREATIVE"],
    creator: "@artbase",
    vibeScore: "+4",
    type: "art"
  }
];

const basedFolksData = [
  {
    name: "Base Builder",
    role: "Smart Contract Developer",
    description: "Building the future of DeFi on Base chain",
    skills: ["Solidity", "React", "Node.js"]
  },
  {
    name: "Design Wizard",
    role: "UI/UX Designer",
    description: "Crafting beautiful Web3 experiences",
    skills: ["Figma", "React", "Design Systems"]
  },
  {
    name: "Art Creator",
    role: "Digital Artist",
    description: "Creating stunning NFT collections",
    skills: ["Photoshop", "Illustrator", "3D Art"]
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("home");

  const filteredProjects = activeCategory === "all" 
    ? projectData 
    : projectData.filter(project => project.type === activeCategory);

  const ProjectCard = ({ project }: { project: typeof projectData[0] }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-card border-2 border-border rounded-lg overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="bg-muted/50 border-b border-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-mono text-muted-foreground">{project.id}</span>
        <span className="text-sm font-mono text-muted-foreground">#{project.id.slice(-1)}</span>
      </div>

      <div className="p-6">
        {/* Project Preview */}
        <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center border border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{project.title.split(' ')[0]}</div>
            <div className="text-sm text-muted-foreground">{project.title.split(' ').slice(1).join(' ')}</div>
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg text-foreground">{project.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded border border-primary/20">
                {tag}
              </span>
            ))}
          </div>

          {/* Creator */}
          <div className="text-sm text-muted-foreground">
            <span>CREATOR: </span>
            <span className="text-primary font-mono">{project.creator}</span>
          </div>

          {/* Execute Button */}
          <div className="border-t border-border pt-3">
            <Button variant="outline" className="w-full font-mono text-sm">
              &gt; WATCH_STREAM
            </Button>
          </div>

          {/* Vibe Score */}
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
          
          <div className="text-xs text-muted-foreground text-center">
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
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} />
        ))}
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
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {basedFolksData.map((person, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="h-80 border-2 border-border bg-card hover:border-primary transition-colors">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center border border-border">
                  <div className="text-4xl">👤</div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{person.name}</h3>
                  <p className="text-sm text-primary mb-2">{person.role}</p>
                  <p className="text-sm text-muted-foreground mb-3">{person.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {person.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-muted text-xs rounded">
                        {skill}
                      </span>
                    ))}
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
        <div className="flex justify-center gap-8 py-4">
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
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {renderSection()}
      </div>
    </div>
  );
}
