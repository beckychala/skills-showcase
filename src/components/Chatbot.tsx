import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: ChatOption[];
  isForm?: boolean;
  formType?: 'contact';
}

interface ChatOption {
  label: string;
  action: string;
  value?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const FAQ_DATA = [
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in modern web technologies including React, TypeScript, Node.js, and various frameworks. Check out my Skills section for a complete list!"
  },
  {
    question: "How can I contact you?",
    answer: "You can reach me through the contact form I can help you fill out, or check the footer for direct contact information."
  },
  {
    question: "What types of projects have you worked on?",
    answer: "I've worked on various projects ranging from web applications to full-stack solutions. Visit my Projects section to see detailed examples of my work!"
  },
  {
    question: "Are you available for freelance work?",
    answer: "Yes! I'm open to freelance opportunities. Please use the contact form to discuss your project requirements."
  },
  {
    question: "What is your experience level?",
    answer: "I have extensive experience in software development. Check out my Experience section to see my professional background and roles."
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "Hi! 👋 I'm your portfolio assistant. How can I help you today?",
        [
          { label: "View Projects", action: "navigate", value: "#projects" },
          { label: "See Skills", action: "navigate", value: "#skills" },
          { label: "View Experience", action: "navigate", value: "#experience" },
          { label: "Contact Form", action: "contact" },
          { label: "FAQ", action: "faq" }
        ]
      );
    }
  }, [isOpen]);

  const addBotMessage = (text: string, options?: ChatOption[], isForm?: boolean, formType?: 'contact') => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      options,
      isForm,
      formType
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (callback: () => void, delay = 800) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
    callback();
  };

  const handleOptionClick = (option: ChatOption) => {
    addUserMessage(option.label);

    if (option.action === 'navigate' && option.value) {
      simulateTyping(() => {
        const section = option.value?.replace('#', '');
        addBotMessage(
          `Great! Navigating to the ${section} section. You can scroll down to explore more.`,
          [
            { label: "Back to Menu", action: "menu" },
            { label: "Contact Me", action: "contact" }
          ]
        );
        
        // Smooth scroll to section
        setTimeout(() => {
          const element = document.getElementById(section || '');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      });
    } else if (option.action === 'contact') {
      simulateTyping(() => {
        addBotMessage(
          "I'd be happy to help you get in touch! Please fill out the contact form below:",
          undefined,
          true,
          'contact'
        );
      });
    } else if (option.action === 'faq') {
      simulateTyping(() => {
        const faqOptions = FAQ_DATA.map((faq, index) => ({
          label: faq.question,
          action: 'faq-answer',
          value: index.toString()
        }));
        addBotMessage(
          "Here are some frequently asked questions. Click on any to see the answer:",
          faqOptions
        );
      });
    } else if (option.action === 'faq-answer' && option.value) {
      const faqIndex = parseInt(option.value);
      const faq = FAQ_DATA[faqIndex];
      simulateTyping(() => {
        addBotMessage(
          faq.answer,
          [
            { label: "More FAQs", action: "faq" },
            { label: "Back to Menu", action: "menu" }
          ]
        );
      });
    } else if (option.action === 'menu') {
      simulateTyping(() => {
        addBotMessage(
          "What would you like to explore?",
          [
            { label: "View Projects", action: "navigate", value: "#projects" },
            { label: "See Skills", action: "navigate", value: "#skills" },
            { label: "View Experience", action: "navigate", value: "#experience" },
            { label: "Contact Form", action: "contact" },
            { label: "FAQ", action: "faq" }
          ]
        );
      });
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const userInput = inputValue.toLowerCase();
    setInputValue('');

    // Simple keyword matching for natural language
    simulateTyping(() => {
      if (userInput.includes('project') || userInput.includes('work') || userInput.includes('portfolio')) {
        addBotMessage(
          "I can show you the projects section! Would you like to navigate there?",
          [
            { label: "Yes, show projects", action: "navigate", value: "#projects" },
            { label: "Back to Menu", action: "menu" }
          ]
        );
      } else if (userInput.includes('skill') || userInput.includes('technology') || userInput.includes('tech')) {
        addBotMessage(
          "Let me show you the skills and technologies!",
          [
            { label: "View Skills", action: "navigate", value: "#skills" },
            { label: "Back to Menu", action: "menu" }
          ]
        );
      } else if (userInput.includes('experience') || userInput.includes('background') || userInput.includes('history')) {
        addBotMessage(
          "I can show you the professional experience section!",
          [
            { label: "View Experience", action: "navigate", value: "#experience" },
            { label: "Back to Menu", action: "menu" }
          ]
        );
      } else if (userInput.includes('contact') || userInput.includes('reach') || userInput.includes('email')) {
        addBotMessage(
          "I'd be happy to help you get in touch! Please fill out the contact form:",
          undefined,
          true,
          'contact'
        );
      } else if (userInput.includes('faq') || userInput.includes('question') || userInput.includes('help')) {
        const faqOptions = FAQ_DATA.map((faq, index) => ({
          label: faq.question,
          action: 'faq-answer',
          value: index.toString()
        }));
        addBotMessage(
          "Here are some frequently asked questions:",
          faqOptions
        );
      } else {
        addBotMessage(
          "I'm not sure I understood that. Here's what I can help you with:",
          [
            { label: "View Projects", action: "navigate", value: "#projects" },
            { label: "See Skills", action: "navigate", value: "#skills" },
            { label: "View Experience", action: "navigate", value: "#experience" },
            { label: "Contact Form", action: "contact" },
            { label: "FAQ", action: "faq" }
          ]
        );
      }
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      return;
    }

    addUserMessage(`Contact form submitted: ${contactForm.name} (${contactForm.email})`);
    
    simulateTyping(() => {
      addBotMessage(
        "Thank you for your message! I'll get back to you as soon as possible. Is there anything else I can help you with?",
        [
          { label: "View Projects", action: "navigate", value: "#projects" },
          { label: "Back to Menu", action: "menu" }
        ]
      );
    });

    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">Portfolio Assistant</h3>
                  <p className="text-xs opacity-90">Online now</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-light-gray-background">
              {messages.map((message) => (
                <div key={message.id}>
                  <div
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white text-dark-text border border-gray-200'
                      }`}
                    >
                      <p className="font-paragraph text-sm">{message.text}</p>
                    </div>
                  </div>

                  {/* Options */}
                  {message.options && message.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 justify-start">
                      {message.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleOptionClick(option)}
                          className="text-xs bg-white hover:bg-light-gray-background"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Contact Form */}
                  {message.isForm && message.formType === 'contact' && (
                    <div className="mt-3 bg-white p-4 rounded-xl border border-gray-200">
                      <form onSubmit={handleContactSubmit} className="space-y-3">
                        <div>
                          <Input
                            placeholder="Your Name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Your Email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Textarea
                            placeholder="Your Message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                            required
                            className="text-sm min-h-[80px]"
                          />
                        </div>
                        <Button type="submit" className="w-full" size="sm">
                          Send Message
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-dark-text border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-medium-gray rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-medium-gray rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-medium-gray rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="px-3"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
