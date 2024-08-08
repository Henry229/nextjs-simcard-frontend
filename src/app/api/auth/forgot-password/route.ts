import { NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/email'; // 이 함수는 직접 구현해야 합니다

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 사용자 확인
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 비밀번호 재설정 토큰 생성 및 저장 (실제 구현에서는 보다 복잡한 로직이 필요합니다)
    const resetToken = Math.random().toString(36).substr(2, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires: new Date(Date.now() + 3600000) }, // 1시간 후 만료
    });

    // 비밀번호 재설정 이메일 전송
    await sendPasswordResetEmail(user.email, resetToken);

    return NextResponse.json(
      { message: 'Password reset email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
