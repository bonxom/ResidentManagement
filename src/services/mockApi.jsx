// Mock API - Giả lập backend để test frontend
// Xóa file này khi đã có backend thật

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fake database
let users = [
  {
    id: '1',
    fullName: 'Nguyễn Văn A',
    citizenId: '001234567890',
    phoneNumber: '0912345678',
  }
]

export const mockApi = {
  // Mock SignUp
  signUp: async (userData) => {
    await delay(1000) // Giả lập delay network

    // Kiểm tra căn cước đã tồn tại
    const existingUser = users.find(u => u.citizenId === userData.citizenId)
    if (existingUser) {
      throw {
        response: {
          data: {
            message: 'Số căn cước đã được đăng ký'
          }
        }
      }
    }

    // Kiểm tra số điện thoại đã tồn tại
    const existingPhone = users.find(u => u.phoneNumber === userData.phoneNumber)
    if (existingPhone) {
      throw {
        response: {
          data: {
            message: 'Số điện thoại đã được sử dụng'
          }
        }
      }
    }

    // Tạo user mới
    const newUser = {
      id: Date.now().toString(),
      fullName: userData.fullName,
      citizenId: userData.citizenId,
      phoneNumber: userData.phoneNumber,
    }

    users.push(newUser)

    return {
      data: {
        success: true,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          citizenId: newUser.citizenId,
          phoneNumber: newUser.phoneNumber,
        },
        token: `fake_token_${newUser.id}`,
      }
    }
  },

  // Mock SignIn
  signIn: async (credentials) => {
    await delay(1000)

    const user = users.find(
      u => u.citizenId === credentials.citizenId && u.phoneNumber === credentials.phoneNumber
    )

    if (!user) {
      throw {
        response: {
          data: {
            message: 'Số căn cước hoặc số điện thoại không đúng'
          }
        }
      }
    }

    return {
      data: {
        success: true,
        user: {
          id: user.id,
          fullName: user.fullName,
          citizenId: user.citizenId,
          phoneNumber: user.phoneNumber,
        },
        token: `fake_token_${user.id}`,
      }
    }
  },

  // Mock Check Auth
  checkAuth: async () => {
    await delay(500)

    const token = localStorage.getItem('token')
    if (!token || !token.startsWith('fake_token_')) {
      throw {
        response: {
          status: 401,
          data: {
            message: 'Token không hợp lệ'
          }
        }
      }
    }

    const userId = token.replace('fake_token_', '')
    const user = users.find(u => u.id === userId)

    if (!user) {
      throw {
        response: {
          status: 401,
          data: {
            message: 'Người dùng không tồn tại'
          }
        }
      }
    }

    return {
      data: {
        success: true,
        user: {
          id: user.id,
          fullName: user.fullName,
          citizenId: user.citizenId,
          phoneNumber: user.phoneNumber,
        }
      }
    }
  }
}
