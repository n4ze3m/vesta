-- CreateTable
CREATE TABLE "Keeps" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "is_link" BOOLEAN DEFAULT false,
    "keep_type" TEXT DEFAULT 'inbox',
    "sort_no" BIGINT,
    "user_id" UUID,

    CONSTRAINT "Keeps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "password" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" TEXT,
    "description" TEXT,
    "target_url" TEXT,
    "keep_id" UUID,
    "image" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Keeps" ADD CONSTRAINT "Keeps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_keep_id_fkey" FOREIGN KEY ("keep_id") REFERENCES "Keeps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
