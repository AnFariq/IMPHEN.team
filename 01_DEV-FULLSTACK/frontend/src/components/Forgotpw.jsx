import React from "react";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE - Branding */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-500 text-white p-10">
          <h1 className="text-3xl font-bold mb-4">Healthy App</h1>
          <p className="text-sm text-blue-100 text-center">
            Secure your account and continue your journey towards a healthier lifestyle.
          </p>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center md:text-left">
            Reset Password
          </h2>

          <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
            Enter your registered email and we’ll send you a secure link to reset your password.
          </p>

          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              Send Reset Link
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Back to Login */}
          <p className="text-sm text-center text-gray-600">
            Remember your password?{' '}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}