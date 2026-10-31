import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AppProvider } from './context/AppContext';

// Common Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { FarmerRegisterPage } from './pages/auth/FarmerRegisterPage';
import { CustomerRegisterPage } from './pages/auth/CustomerRegisterPage';

// Farmer Pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { FarmerVerificationPage } from './pages/farmer/FarmerVerificationPage';
import { FarmerProductsPage } from './pages/farmer/FarmerProductsPage';
import { FarmerOrdersPage } from './pages/farmer/FarmerOrdersPage';

// Customer Pages
import { MarketplacePage } from './pages/customer/MarketplacePage';
import { ProductDetailPage } from './pages/customer/ProductDetailPage';
import { CartPage } from './pages/customer/CartPage';
import { CustomerOrdersPage } from './pages/customer/CustomerOrdersPage';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';

// Community & Advisory Pages
import { CommunityPage } from './pages/community/CommunityPage';
import { PostDetailPage } from './pages/community/PostDetailPage';
import { CropGuidancePage } from './pages/community/CropGuidancePage';

// Communication & Admin Pages
import { MessagesPage } from './pages/messages/MessagesPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVerificationPage } from './pages/admin/AdminVerificationPage';
import { AdminUserManagementPage } from './pages/admin/AdminUserManagementPage';
import { AdminModerationPage } from './pages/admin/AdminModerationPage';

// Simple Protected Route helper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <CartProvider>
            <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <div style={{ flexGrow: 1 }}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/marketplace/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/community/:id" element={<PostDetailPage />} />
                  <Route path="/crop-guidance" element={<CropGuidancePage />} />
                  <Route path="/messages" element={<MessagesPage />} />

                  {/* Auth routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register/farmer" element={<FarmerRegisterPage />} />
                  <Route path="/register/customer" element={<CustomerRegisterPage />} />

                  {/* Farmer Portal */}
                  <Route
                    path="/farmer/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
                        <FarmerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/farmer/verification"
                    element={
                      <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
                        <FarmerVerificationPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/farmer/products"
                    element={
                      <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
                        <FarmerProductsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/farmer/orders"
                    element={
                      <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
                        <FarmerOrdersPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Customer Portal */}
                  <Route
                    path="/customer/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                        <CustomerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/customer/orders"
                    element={
                      <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                        <CustomerOrdersPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Portal */}
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['ADMIN']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/verifications"
                    element={
                      <ProtectedRoute allowedRoles={['ADMIN']}>
                        <AdminVerificationPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <ProtectedRoute allowedRoles={['ADMIN']}>
                        <AdminUserManagementPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/moderation"
                    element={
                      <ProtectedRoute allowedRoles={['ADMIN']}>
                        <AdminModerationPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </CartProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

