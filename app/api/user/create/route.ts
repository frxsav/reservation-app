import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { getUserByEmail, getUserByUsername } from '../user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    console.info('Prisma route: ', prisma);

    // email check
    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'La mail è già associata ad un altro account.' },
        { status: 409 }
      );
    }
    // username check
    const existingUserByame = await getUserByUsername(name);
    if (existingUserByame) {
      return NextResponse.json(
        {
          user: null,
          message: 'Lo username è già associato ad un altro account.',
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    // removing password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: 'User created successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Server Error - ' + error,
      },
      { status: 500 }
    );
  }
}
