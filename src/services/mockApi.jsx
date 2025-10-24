
//MOCK API - GIẢ LẬP DỮ LIỆU NGƯỜI DÙNG

import { ROLES } from '../constants/roles'

const mockUsers = [
  {
    citizenId: '001234567890',
    fullName: 'Nguyễn Văn A',
    password: '123456',
    role: ROLES.TO_DAN_PHO,
    phoneNumber: '0909123456',
    address: '123 Đường Hoa Sữa',
    householdBookId: 'HGD001',
  },
  {
    citizenId: '001234567891',
    fullName: 'Trần Thị B',
    password: '123456',
    role: ROLES.KIEM_TOAN,
    phoneNumber: '0912345678',
    address: '456 Đường Lê Lợi',
    householdBookId: 'HGD002',
  },
  {
    citizenId: '001234567892',
    fullName: 'Lê Văn C',
    password: '123456',
    role: ROLES.CHU_HO,
    phoneNumber: '0923456789',
    address: '789 Đường Trần Phú',
    householdBookId: 'HGD003',
  },
  {
    citizenId: '001234567893',
    fullName: 'Phạm Thị D',
    password: '123456',
    role: ROLES.CU_DAN,
    phoneNumber: '0934567890',
    address: '12 Đường Nguyễn Huệ',
    householdBookId: 'HGD004',
  },
]

export const mockSignIn = async (citizenId, password) => {
  const user = mockUsers.find(
    (u) => u.citizenId === citizenId && u.password === password
  )

  if (!user) {
    throw new Error('Sai căn cước công dân hoặc mật khẩu')
  }

  const token = 'mock-token-' + Math.random().toString(36).substring(2, 10)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token,
        user: {
          citizenId: user.citizenId,
          fullName: user.fullName,
          role: user.role,
          phoneNumber: user.phoneNumber,
          address: user.address,
          householdBookId: user.householdBookId,
        },
      })
    }, 600)
  })
}

export const mockSignUp = async (newUser) => {
  const exists = mockUsers.some((u) => u.citizenId === newUser.citizenId)
  if (exists) {
    throw new Error('Căn cước công dân đã tồn tại trong hệ thống')
  }

  const user = {
    ...newUser,
    password: newUser.password || '123456',
  }

  mockUsers.push(user)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Đăng ký thành công', user })
    }, 800)
  })
}

export const mockGetUser = async (citizenId) => {
  const user = mockUsers.find((u) => u.citizenId === citizenId)
  if (!user) throw new Error('Không tìm thấy người dùng')

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user)
    }, 400)
  })
}

export const mockSignOut = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Đăng xuất thành công' })
    }, 300)
  })
}

export default {
  mockSignIn,
  mockSignUp,
  mockGetUser,
  mockSignOut,
}
