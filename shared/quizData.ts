import { QuizItem } from "./schema";

export const quizItems: QuizItem[] = [
  // Customer-Centric Approach
  {
    id: "cca1",
    category: "Customer-Centric Approach",
    title: "Do you offer rewards that are tailored to each customer's preferences and purchase history?",
    description: "This means using past purchase data to create personalized rewards rather than generic offers for everyone.",
    weightedPoints: 4,
    advice: "Use past purchase history to drive reward offerings. This makes the program feel intentional, not generic."
  },
  {
    id: "cca2",
    category: "Customer-Centric Approach",
    title: "Do you send personalized offers based on individual shopping habits and browsing behavior?",
    description: "Automated systems that track what customers buy or browse to send relevant, targeted offers.",
    weightedPoints: 4,
    advice: "Set up automations that send offers based on what each customer buys or browses. Targeted relevance increases conversion."
  },
  {
    id: "cca3",
    category: "Customer-Centric Approach",
    title: "Do you reward customers for high-value behaviors beyond just purchases?",
    description: "This includes rewards for actions like referring friends, reaching visit milestones, or making purchases at key intervals.",
    weightedPoints: 3.6,
    advice: "Reward customers for high-value actions like referring friends, visiting multiple times, or purchasing at key intervals."
  },
  {
    id: "cca4",
    category: "Customer-Centric Approach",
    title: "Do you offer multiple ways for customers to redeem their points and rewards?",
    description: "Various redemption options like discounts, exclusive products, surprise gifts, or special experiences.",
    weightedPoints: 3.6,
    advice: "Offer multiple ways to use points, like discounts, exclusive drops, or surprise gifts. Give customers a reason to keep checking back."
  },
  {
    id: "cca5",
    category: "Customer-Centric Approach",
    title: "Can customers sign up for your program in under 30 seconds and easily track their status?",
    description: "Quick enrollment process with easy access to points and status through receipts, online accounts, or SMS.",
    weightedPoints: 4,
    advice: "Make sure customers can join in seconds and easily view their points and status on receipts, online, or via SMS."
  },
  {
    id: "cca6",
    category: "Customer-Centric Approach",
    title: "Can customers easily see their point balance and available rewards without asking staff?",
    description: "Clear visibility of points and rewards both in-store and through digital channels.",
    weightedPoints: 3.6,
    advice: "Display point balances and reward options clearly in-store and digitally. Lack of visibility kills engagement."
  },

  // Engagement & Communication
  {
    id: "ec1",
    category: "Engagement & Communication",
    title: "Do you send regular updates about customer status, rewards, and promotions?",
    description: "Consistent messaging rhythm through SMS, email, or app notifications to keep loyalty top of mind.",
    weightedPoints: 3.6,
    advice: "Build a rhythm of messaging, weekly SMS, monthly email, occasional surprises to keep loyalty top of mind."
  },
  {
    id: "ec2",
    category: "Engagement & Communication",
    title: "Do you maintain a consistent and reliable communication schedule with loyalty members?",
    description: "Regular, predictable outreach schedule rather than sporadic or inconsistent messaging.",
    weightedPoints: 3.6,
    advice: "Set a reliable cadence for outreach. Infrequent or inconsistent messaging causes drop-off."
  },
  {
    id: "ec3",
    category: "Engagement & Communication",
    title: "Do your notifications include personalized details like the customer's name and point balance?",
    description: "Customized alerts that show individual customer information and tailored reward suggestions.",
    weightedPoints: 3.2,
    advice: "Send alerts that include the customer's name, point balance, and personalized reward suggestions."
  },
  {
    id: "ec4",
    category: "Engagement & Communication",
    title: "Do you create engaging content that connects your loyalty program to seasonal offers or lifestyle benefits?",
    description: "Content marketing that ties loyalty rewards to current promotions, staff picks, or lifestyle advantages.",
    weightedPoints: 3.2,
    advice: "Use content that links the loyalty program to seasonal drops, staff picks, or lifestyle benefits. Give people a reason to come back."
  },

  // Data Utilization & Analytics
  {
    id: "dua1",
    category: "Data Utilization & Analytics",
    title: "Do you track which loyalty offers perform best and use that data to refine your program?",
    description: "Analytics system that measures offer performance and uses insights to adjust budget and strategy.",
    weightedPoints: 4,
    advice: "Start tracking which offers perform best. Use that data to shift budget and strategy accordingly."
  },
  {
    id: "dua2",
    category: "Data Utilization & Analytics",
    title: "Do you monitor key performance indicators like return visit rate and reward redemption rate?",
    description: "Defined KPIs with dashboards to track metrics like customer frequency, redemption rates, and program engagement over time.",
    weightedPoints: 3.6,
    advice: "Define KPIs like return visit rate, reward redemption rate, and frequency. Build dashboards to track over time."
  },
  {
    id: "dua3",
    category: "Data Utilization & Analytics",
    title: "Do you log and analyze loyalty program metrics on a monthly basis?",
    description: "Regular monthly tracking of key metrics to identify trends, catch customer churn, or spot seasonal patterns.",
    weightedPoints: 3.6,
    advice: "Log key metrics monthly. Track trends to catch churn or spot seasonal patterns."
  },
  {
    id: "dua4",
    category: "Data Utilization & Analytics",
    title: "Do you conduct quarterly reviews to evaluate and adjust your loyalty program strategy?",
    description: "Scheduled quarterly assessments to determine what's working and where to modify campaigns or offers.",
    weightedPoints: 3.6,
    advice: "Put time on the calendar every quarter to evaluate what's working and where to adjust campaigns or offers."
  },

  // Referrals & Social Sharing
  {
    id: "rss1",
    category: "Referrals & Social Sharing",
    title: "Do you offer referral bonuses that reward both the referring customer and the new customer?",
    description: "Simple referral incentives like points or discounts for both the person making the referral and the new customer.",
    weightedPoints: 3.2,
    advice: "Add a referral bonus. Keep it simple - points or a small discount for both sender and receiver."
  },
  {
    id: "rss2",
    category: "Referrals & Social Sharing",
    title: "Do you provide easy ways for members to share your loyalty program benefits on social media?",
    description: "Tools, templates, or incentives that make it simple for customers to share program benefits and extend your reach.",
    weightedPoints: 2.8,
    advice: "Give members ways to share program benefits on social. Templates or rewards for sharing help extend reach."
  },
  {
    id: "rss3",
    category: "Referrals & Social Sharing",
    title: "Do you consistently promote referral opportunities across all your loyalty communications?",
    description: "Regular mentions of referral programs in emails, SMS, in-store signage, and other customer touchpoints.",
    weightedPoints: 2.8,
    advice: "Mention referral opportunities in every loyalty message—email, SMS, in-store signage. Reinforcement drives action."
  },

  // Flexibility & Adaptability
  {
    id: "fa1",
    category: "Flexibility & Adaptability",
    title: "Is your loyalty program designed to scale with business growth and changing needs?",
    description: "Program structure that can adapt to more locations, traffic changes, or business expansion without hitting limits.",
    weightedPoints: 3.6,
    advice: "Structure rewards so they can flex with more locations or changes in foot traffic. Avoid setting limits you'll later outgrow."
  },
  {
    id: "fa2",
    category: "Flexibility & Adaptability",
    title: "Do you regularly collect and act on customer feedback about your loyalty program?",
    description: "Systems for gathering customer input through surveys or staff feedback to understand what's working and what isn't.",
    weightedPoints: 3.2,
    advice: "Run quick surveys or use budtender feedback to learn what's landing and what isn't."
  },
  {
    id: "fa3",
    category: "Flexibility & Adaptability",
    title: "Do you refresh your program visuals, rewards, and structure every six months?",
    description: "Regular updates to keep the program fresh, competitive, and aligned with current customer preferences.",
    weightedPoints: 3.2,
    advice: "Refresh your program visuals, rewards, and point logic every six months to stay fresh and competitive."
  },

  // Attractive Rewards
  {
    id: "ar1",
    category: "Attractive Rewards",
    title: "Do you offer different types of rewards that appeal to casual, regular, and frequent customers?",
    description: "Varied reward options that resonate with different customer segments, from occasional visitors to power shoppers.",
    weightedPoints: 3.2,
    advice: "Create rewards that resonate with casual, mid-tier, and power shoppers. Each group needs a different hook."
  },
  {
    id: "ar2",
    category: "Attractive Rewards",
    title: "Can even your least frequent customers redeem rewards without waiting months or years?",
    description: "Achievable reward thresholds that allow low-frequency customers to experience early wins and build loyalty.",
    weightedPoints: 3.2,
    advice: "Ensure even low-frequency customers can redeem something without years of spend. Early wins build loyalty."
  },
  {
    id: "ar3",
    category: "Attractive Rewards",
    title: "Do you offer multiple ways to earn points beyond just making purchases?",
    description: "Various earning opportunities like visiting milestones, writing reviews, social sharing, or completing challenges.",
    weightedPoints: 2.8,
    advice: "Add new ways to earn—gamified visits, reviews, social shares, milestone visits—not just spend-based points."
  },

  // Exceptional Customer Service
  {
    id: "ecs1",
    category: "Exceptional Customer Service",
    title: "Can your staff easily troubleshoot loyalty program issues and look up customer point balances?",
    description: "Well-trained staff with access to tools needed to resolve customer loyalty questions without creating friction.",
    weightedPoints: 4,
    advice: "Make sure staff know how to troubleshoot rewards or look up point balances. Friction kills trust."
  },
  {
    id: "ecs2",
    category: "Exceptional Customer Service",
    title: "Do you actively collect customer feedback about your loyalty program experience?",
    description: "Systems like surveys, comment boxes, or post-visit messages to gather customer input on program improvements.",
    weightedPoints: 3.6,
    advice: "Set up short surveys, comment boxes, or post-visit messages to collect input. Customers will tell you what's missing."
  },
  {
    id: "ecs3",
    category: "Exceptional Customer Service",
    title: "Do both customers and staff know exactly where to get help with loyalty program issues?",
    description: "Clear support channels and processes for loyalty program assistance, whether in-store, by phone, or through chat.",
    weightedPoints: 3.6,
    advice: "Ensure both staff and customers know where to go for loyalty help—in-store, phone, or chat."
  },
  {
    id: "ecs4",
    category: "Exceptional Customer Service",
    title: "Are your staff members trained to confidently explain how customers earn and use rewards?",
    description: "Comprehensive staff training on loyalty program details to ensure confident, accurate information sharing with customers.",
    weightedPoints: 3.6,
    advice: "Train staff to speak confidently about how to earn and use rewards. Internal buy-in drives external adoption."
  },

  // Multi-Channel Accessibility
  {
    id: "mca1",
    category: "Multi-Channel Accessibility",
    title: "Does your loyalty program work consistently whether customers shop online, on mobile, or in-store?",
    description: "Seamless program functionality across all shopping channels with consistent access to points and rewards.",
    weightedPoints: 2.8,
    advice: "Your program should work whether someone shops online, on mobile, or in-store. Keep it consistent and connected."
  },
  {
    id: "mca2",
    category: "Multi-Channel Accessibility",
    title: "Is your loyalty program branding and messaging consistent across all customer touchpoints?",
    description: "Unified loyalty voice, visuals, and value proposition across email, SMS, in-store signage, website, and mobile app.",
    weightedPoints: 3.2,
    advice: "Your loyalty voice, visuals, and value should feel unified across email, SMS, signage, and website. Avoid disjointed experiences."
  }
];

export const categoryOrder = [
  "Customer-Centric Approach",
  "Engagement & Communication", 
  "Data Utilization & Analytics",
  "Referrals & Social Sharing",
  "Flexibility & Adaptability",
  "Attractive Rewards",
  "Exceptional Customer Service",
  "Multi-Channel Accessibility"
];

export const categorySummaries = {
  "Customer-Centric Approach": "Measures how well your program puts customer needs and preferences at the center of reward design and experience.",
  "Engagement & Communication": "Evaluates your ability to maintain regular, meaningful contact with loyalty program members.",
  "Data Utilization & Analytics": "Assesses how effectively you use data to track, measure, and improve your loyalty program performance.",
  "Referrals & Social Sharing": "Reviews your program's ability to leverage word-of-mouth and social proof to acquire new customers.",
  "Flexibility & Adaptability": "Examines how well your program can evolve and adapt to changing business needs and customer feedback.",
  "Attractive Rewards": "Analyzes whether your rewards are compelling, attainable, and appeal to different customer segments.",
  "Exceptional Customer Service": "Measures the quality of support and training around your loyalty program experience.",
  "Multi-Channel Accessibility": "Evaluates how consistently your program works across all customer touchpoints and channels."
};

export const overallScoreFeedback = {
  90: {
    title: "Exceptional Loyalty Program",
    feedback: "You're running a world-class loyalty program that truly drives customer retention and engagement. Your program demonstrates excellence across all key areas.",
    recommendations: ["Continue monitoring performance", "Share best practices with industry peers", "Consider expanding successful elements"]
  },
  80: {
    title: "Strong Loyalty Program",
    feedback: "Your loyalty program is performing well above average with solid foundations in place. There are opportunities to fine-tune certain areas for even better results.",
    recommendations: ["Focus on underperforming categories", "Implement advanced personalization", "Strengthen data analytics capabilities"]
  },
  70: {
    title: "Good Foundation",
    feedback: "You have a solid loyalty program foundation with room for meaningful improvements. Most core elements are in place but need optimization.",
    recommendations: ["Prioritize customer-centric features", "Improve communication consistency", "Enhance reward variety and appeal"]
  },
  60: {
    title: "Needs Improvement",
    feedback: "Your loyalty program has the basics but isn't reaching its full potential. Several key areas need attention to drive better customer engagement.",
    recommendations: ["Conduct customer feedback surveys", "Implement regular program reviews", "Focus on communication and personalization"]
  },
  50: {
    title: "Significant Gaps",  
    feedback: "Your loyalty program has substantial gaps that are likely limiting its effectiveness. A comprehensive review and improvement plan is needed.",
    recommendations: ["Start with customer-centric improvements", "Establish consistent communication", "Implement basic analytics and tracking"]
  },
  0: {
    title: "Major Overhaul Needed",
    feedback: "Your loyalty program requires fundamental changes to become effective. Consider rebuilding from the ground up with customer needs as the focus.",
    recommendations: ["Redesign program from customer perspective", "Establish clear value proposition", "Implement essential features first"]
  }
};