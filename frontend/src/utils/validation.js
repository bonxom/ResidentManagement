import { z } from 'zod'

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Vui lòng nhập họ tên')
    .min(3, 'Họ tên phải có ít nhất 3 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự')
    .regex(/^[\p{L}\s]+$/u, 'Họ tên chỉ chứa chữ cái và khoảng trắng'),
  
  // Xóa 'citizenId'

  phoneNumber: z
    .string()
    .min(1, 'Vui lòng nhập số điện thoại')
    .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ'),
  
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không hợp lệ'),
  
  location: z
    .string()
    .min(1, 'Vui lòng nhập địa chỉ') // Đổi tên lỗi
    .max(200, 'Địa chỉ không được quá 200 ký tự'),
  
  // Xóa 'curAddress'
  // Xóa 'householdBookId'
  
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(50, 'Mật khẩu không được quá 50 ký tự'),
  
  confirmPassword: z
    .string()
    .min(1, 'Vui lòng xác nhận mật khẩu'),
  
  // Xóa 'role'

}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
})

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  // Xóa 'role' và 'citizenId'
})