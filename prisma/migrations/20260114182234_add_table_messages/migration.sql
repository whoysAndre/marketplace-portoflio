-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name_product" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "publicator_id" INTEGER NOT NULL,
    "buyer_id" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
