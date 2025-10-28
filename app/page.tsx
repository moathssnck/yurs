"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Eye, EyeOff, LogIn, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { auth } from "@/lib/firestore"
import Link from "next/link"

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      router.push("/notifications")
    } catch (err) {
      setError("فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 p-4 rounded-full">
            <User className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-gray-800 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>

          <CardHeader className="space-y-1 text-center pt-8">
            <CardTitle className="text-2xl font-bold text-white">تسجيل الدخول</CardTitle>
            <p className="text-gray-400 text-sm">أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="ادخل البريد الإلكتروني"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-4"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    كلمة المرور
                  </label>
              
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="ادخل كلمة المرور"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-4"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-green-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-md">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  "جاري تسجيل الدخول..."
                ) : (
                  <>
                    <span>تسجيل الدخول</span>
                    <LogIn className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

        </Card>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  )
}
