import { Message } from "../models/message.js";
export const Messaging=async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    
    try {
      const messages = await Message.findAll({
        limit: parseInt(limit, 10),
        offset: (page - 1) * limit,
        order: [['createdAt', 'DESC']], // Order messages by createdAt in descending order
   
      });
  
      const totalMessages = await Message.count();
      const totalPages = Math.ceil(totalMessages / limit);
  
      res.json({
        messages,
        currentPage: parseInt(page, 10),
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  