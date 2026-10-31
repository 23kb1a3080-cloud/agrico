import React, { createContext, useContext, useState } from 'react';
import {
  initialProducts,
  initialOrders,
  initialCommunityPosts,
  cropAdvisoryDatabase,
  initialMessages,
  initialUsers
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [communityPosts, setCommunityPosts] = useState(initialCommunityPosts);
  const [messages, setMessages] = useState(initialMessages);
  const [users, setUsers] = useState(initialUsers);

  // PRODUCT ACTIONS (Farmer / Admin)
  const addProduct = (newProduct) => {
    const product = {
      id: Date.now(),
      rating: 5.0,
      reviewCount: 0,
      image: newProduct.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
      ...newProduct
    };
    setProducts(prev => [product, ...prev]);
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // ORDER ACTIONS (Customer / Farmer)
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      placedAt: new Date().toLocaleString(),
      status: 'PLACED',
      trackingTimeline: [
        { stage: 'PLACED', time: new Date().toLocaleString(), note: 'Order placed by customer' }
      ],
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, note = '') => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const newTimeline = [
            ...order.trackingTimeline,
            { stage: newStatus, time: new Date().toLocaleString(), note: note || `Order updated to ${newStatus}` }
          ];
          return { ...order, status: newStatus, trackingTimeline: newTimeline };
        }
        return order;
      })
    );
  };

  // VERIFICATION ACTIONS (Admin)
  const verifyFarmer = (farmerId, status, remarks = '') => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === farmerId) {
          return {
            ...u,
            verificationStatus: status,
            verificationRemarks: remarks,
            verifiedAt: status === 'APPROVED' ? new Date().toISOString().split('T')[0] : null
          };
        }
        return u;
      })
    );
  };

  const submitFarmerDocuments = (farmerId, docData) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === farmerId) {
          return {
            ...u,
            ...docData,
            verificationStatus: 'PENDING',
            submittedAt: new Date().toISOString().split('T')[0]
          };
        }
        return u;
      })
    );
  };

  // COMMUNITY ACTIONS
  const addCommunityPost = (postData) => {
    const newPost = {
      id: Date.now(),
      createdAt: 'Just now',
      likes: 0,
      replies: [],
      ...postData
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const addCommentToPost = (postId, commentData) => {
    setCommunityPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: Date.now(),
                createdAt: 'Just now',
                ...commentData
              }
            ]
          };
        }
        return post;
      })
    );
  };

  // MESSAGING ACTIONS
  const sendMessage = (senderId, senderName, receiverId, receiverName, text) => {
    const newMsg = {
      id: Date.now(),
      senderId,
      senderName,
      receiverId,
      receiverName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages(prev => [...prev, newMsg]);
    return newMsg;
  };

  // USER MANAGEMENT
  const toggleUserStatus = (userId) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u))
    );
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        placeOrder,
        updateOrderStatus,
        users,
        verifyFarmer,
        submitFarmerDocuments,
        communityPosts,
        addCommunityPost,
        addCommentToPost,
        cropGuides: cropAdvisoryDatabase,
        messages,
        sendMessage,
        toggleUserStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

