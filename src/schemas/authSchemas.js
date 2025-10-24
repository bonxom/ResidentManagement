import { z } from 'zod'

export const signUpSchema = z
  .object({
    fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự').max(50),
    citizenId: z
      .string()
      .regex(/^[0-9]{12}$/, 'Số căn cước phải có đúng 12 chữ số'),
    phoneNumber: z
      .string()
      .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ'),
    email: z.string().email('Email không hợp lệ'),
    address: z.string().min(5, 'Địa chỉ không hợp lệ'),
    householdId: z.string().min(5, 'Sổ hộ khẩu không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

export const signInSchema = z.object({
  citizenId: z
    .string()
    .regex(/^[0-9]{12}$/, 'Số căn cước phải có đúng 12 chữ số'),
  password: z.string().min(6, 'Mật khẩu là bắt buộc'),
})
