import { z } from 'zod'
import { ROLES } from '../constants/roles'

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Vui lòng nhập họ tên')
    .min(3, 'Họ tên phải có ít nhất 3 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự')
    .regex(/^[\p{L}\s]+$/u, 'Họ tên chỉ chứa chữ cái và khoảng trắng'),
  
  citizenId: z
    .string()
    .min(1, 'Vui lòng nhập số căn cước')
    .length(12, 'Số căn cước phải có đúng 12 chữ số')
    .regex(/^\d+$/, 'Số căn cước chỉ chứa chữ số'),
  
  phoneNumber: z
    .string()
    .min(1, 'Vui lòng nhập số điện thoại')
    .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ'),
  
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không hợp lệ'),
  
  address: z
    .string()
    .min(1, 'Vui lòng nhập địa chỉ thường trú')
    .max(200, 'Địa chỉ không được quá 200 ký tự'),
  
  curAddress: z
    .string()
    .max(200, 'Địa chỉ không được quá 200 ký tự')
    .optional()
    .or(z.literal('')), // Cho phép empty string
  
  householdBookId: z
    .string()
    .max(50, 'Số sổ hộ khẩu không được quá 50 ký tự')
    .optional()
    .or(z.literal('')), // Cho phép empty string
  
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(50, 'Mật khẩu không được quá 50 ký tự'),
  
  confirmPassword: z
    .string()
    .min(1, 'Vui lòng xác nhận mật khẩu'),
  
  role: z
    .enum([ROLES.CUDAN, ROLES.CHUHO], {
      errorMap: () => ({ message: 'Vai trò không hợp lệ' })
    })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
})

export const signInSchema = z.object({
  citizenId: z
    .string()
    .regex(/^[0-9]{12}$/, 'Số căn cước phải có đúng 12 chữ số'),
  password: z.string().min(6, 'Mật khẩu không hợp lệ'),
  role: z.string().optional(),
})
