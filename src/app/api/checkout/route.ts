import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    customer?: {
      fullName?: string;
      email?: string;
      address?: string;
      city?: string;
      country?: string;
    };
    items?: Array<{ slug?: string; quantity?: number }>;
  };

  if (
    !body.customer?.fullName ||
    !body.customer.email ||
    !body.customer.address ||
    !body.customer.city ||
    !body.customer.country
  ) {
    return NextResponse.json(
      { message: "Missing customer details" },
      { status: 400 },
    );
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { message: "No items supplied" },
      { status: 400 },
    );
  }

  const orderId = `AH-${new Date().getFullYear()}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

  return NextResponse.json({
    orderId,
    status: "confirmed",
  });
}
