"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const AITutor = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const generateAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello! How can I help you with your studies today?";
    } else if (lowerCaseMessage.includes("math") || lowerCaseMessage.includes("mathematics")) {
      return "Mathematics is a fascinating subject! What specific topic are you struggling with, like algebra, geometry, or calculus?";
    } else if (lowerCaseMessage.includes("science")) {
      return "Science covers many areas! Are you interested in biology, chemistry, physics, or something else?";
    } else if (lowerCaseMessage.includes("shona")) {
      return "Ndingakubatsira sei nechidzidzo cheShona? (How can I help you with your Shona lesson?)";
    } else if (lowerCaseMessage.includes("ndebele")) {
      return "Ngingakusiza njani ngesifundo seNdebele? (How can I help you with your Ndebele lesson?)";
    } else if (lowerCaseMessage.includes("offline")) {
      return "This app is designed to work offline! You can download modules and access the AI tutor without constant internet. Updates can sync when you're connected.";
    } else if (lowerCaseMessage.includes("thank you") || lowerCaseMessage.includes("thanks")) {
      return "You're welcome! Feel free to ask if you have more questions.";
    } else {
      return "That's an interesting question! I'm still learning, but I can try to provide information on curriculum-aligned topics. Could you rephrase or ask about a specific subject?";
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === "") {
      toast.error("Please type a message.");
      return;
    }

    const newUserMessage: Message = {
      id: Date.now().toString() + "-user",
      sender: "user",
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    // Simulate AI typing/thinking time
    setTimeout(() => {
      const aiResponseText = generateAIResponse(newUserMessage.text);
      const newAIMessage: Message = {
        id: Date.now().toString() + "-ai",
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, newAIMessage]);
    }, 1000);
  };

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-80px)]"> {/* Adjust height based on layout */}
      <h1 className="text-3xl font-bold mb-2">AI Tutor</h1>
      <p className="text-lg text-gray-700 mb-6">
        Ask your questions in English, Shona, or Ndebele!
      </p>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Chat with your AI Tutor</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Start by asking me a question about your studies!
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start gap-3",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === "ai" && (
                      <Bot className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    )}
                    <div
                      className={cn(
                        "max-w-[70%] p-3 rounded-lg",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-muted-foreground rounded-bl-none"
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="block text-xs opacity-70 mt-1">
                        {message.timestamp}
                      </span>
                    </div>
                    {message.sender === "user" && (
                      <User className="h-6 w-6 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          <div className="flex items-center gap-2 pt-4 border-t mt-4">
            <Input
              placeholder="Type your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITutor;