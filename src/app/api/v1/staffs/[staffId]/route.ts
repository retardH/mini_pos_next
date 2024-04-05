import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prismaClient";

type paramsType = { params: { staffId: string } };

/* GET /api/v1/staffs/:staffId */
export async function GET(req: NextRequest, { params }: { params: { staffId: string } }) {
    const staff = await prisma.staff.findUnique({
        where: {
            staffId: params.staffId,
        },
    });

    if (!staff) return NextResponse.json({ message: "Staff not found." }, { status: 404 });

    return NextResponse.json(staff);
}

/* PUT /api/v1/staffs/:staffId */
export async function PUT(req: NextRequest, { params }: paramsType) {
    const body = await req.json();

    const updatedStaff = await prisma.staff.update({
        where: {
            staffId: params.staffId,
        },
        data: {
            staffCode: body.staffCode,
            staffName: body.staffName,
        },
    });

    if (!updatedStaff) return NextResponse.json({ message: "Staff not found." }, { status: 404 });

    return NextResponse.json(updatedStaff);
}

/* DELETE /api/v1/staffs/:staffId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    const deletedStaff = await prisma.staff.delete({
        where: { staffId: params.staffId },
    });

    if (!deletedStaff) return NextResponse.json({ message: "Staff not found." }, { status: 404 });

    return NextResponse.json({
        message: "Staff deleted.",
        productCategoryId: deletedStaff.staffId,
    });
}