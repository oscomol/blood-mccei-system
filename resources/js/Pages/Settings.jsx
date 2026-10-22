import React, { useEffect, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Lock,
  Bell,
  Shield,
  Save,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  Download
} from 'lucide-react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';
import ConfirmDeleteAccout from '@/Components/User/Settings/ConfirmDeleteAccout';

const Settings = () => {
  const props = usePage().props;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const { data: profileData, setData: setProfileData, patch: updateProfile, processing: profileProcessing, errors: profileErrors } = useForm({
    name: props?.auth?.user?.name || '',
    email: props?.auth?.user?.email || ''
  });

  // Password form
  const { data: passwordData, setData: setPasswordData, put: updatePassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword } = useForm({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(route('profile.update'));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    updatePassword(route('password.update'), {
      onSuccess: () => resetPassword()
    });
  };

   const handleDeleteAccount = () => {
    setIsConfirmOpen(true)
    };
 

  return (
    <>
    <AuthenticatedLayout2
     title="Settings"
     subtitle="Manage your account information and preferences"
     subtitle1ST="Account settings"
     >
      <Head title='Account Settings' />
       <div>

            <div className="space-y-6">
              
              {/* Profile Information */}
              <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 border-b">
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Profile Information
                  </CardTitle>
                  <p className="text-gray-600 text-sm">Update your basic account information</p>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData('name', e.target.value)}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your full name"
                        />
                        {profileErrors.name && (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {profileErrors.name}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData('email', e.target.value)}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your email address"
                        />
                        {profileErrors.email && (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {profileErrors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Button
                        type="submit"
                        disabled={profileProcessing}
                        className="bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                      >
                        {profileProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Password & Security */}
              <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 border-b">
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-blue-600" />
                    Password & Security
                  </CardTitle>
                  <p className="text-gray-600 text-sm">Update your password to keep your account secure</p>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current_password" className="text-sm font-semibold text-gray-700">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="current_password"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.current_password}
                          onChange={(e) => setPasswordData('current_password', e.target.value)}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordErrors.current_password && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {passwordErrors.current_password}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                          New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPasswords.new ? "text" : "password"}
                            value={passwordData.password}
                            onChange={(e) => setPasswordData('password', e.target.value)}
                            className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {passwordErrors.password && (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {passwordErrors.password}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password_confirmation" className="text-sm font-semibold text-gray-700">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password_confirmation"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={passwordData.password_confirmation}
                            onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                            className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {passwordErrors.password_confirmation && (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {passwordErrors.password_confirmation}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Button
                        type="submit"
                        disabled={passwordProcessing}
                        variant="outline"
                      >
                        {passwordProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            Update Password
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
             

              {/* Privacy & Data */}
              <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 border-b">
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Quit to MCCEI 
                  </CardTitle>
                  <p className="text-gray-600 text-sm">This will permanently delete your account</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">

                  <div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <Label className="text-sm font-semibold text-red-700">
                          Delete Account
                        </Label>
                        <p className="text-sm text-red-600 mt-1">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                      <Button 
                        onClick={handleDeleteAccount}
                        variant="destructive" 
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 w-full sm:w-auto sm:ml-4 sm:flex-shrink-0 text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
          </div>
    </AuthenticatedLayout2>
    <ConfirmDeleteAccout {...{isConfirmOpen, setIsConfirmOpen}} />
    </>
  );
};

export default Settings;