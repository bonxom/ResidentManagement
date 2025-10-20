import { z } from 'zod'

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được quá 50 ký tự'),
  citizenId: z
    .string()
    .regex(/^[0-9]{12}$/, 'Số căn cước phải có đúng 12 chữ số')
    .min(1, 'Số căn cước là bắt buộc'),
  phoneNumber: z
    .string()
    .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ')
    .min(1, 'Số điện thoại là bắt buộc'),
  confirmPassword: z
    .string()
    .min(1, 'Vui lòng xác nhận mật khẩu'),
}).refine((data) => data.citizenId === data.confirmPassword, {
  message: 'Số căn cước xác nhận không khớp',
  path: ['confirmPassword'],
})

export const signInSchema = z.object({
  citizenId: z
    .string()
    .regex(/^[0-9]{12}$/, 'Số căn cước phải có đúng 12 chữ số')
    .min(1, 'Số căn cước là bắt buộc'),
  phoneNumber: z
    .string()
    .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ')
    .min(1, 'Số điện thoại là bắt buộc'),
})