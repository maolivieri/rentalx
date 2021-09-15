import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("List Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXXXXX')    
        `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to list a all categories", async () => {
        const responseToken = await request(app).post("sessions").send({
            email: "admin@email.com",
            password: "admin",
        });

        const { token } = responseToken.body;

        await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Descriptions",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get("categories");

        expect(response.status).toBe(200);
        expect(response.body.lenght).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty("id");
    });

    it("should not be able to create a new category when name already exists", async () => {
        const responseToken = await request(app).post("sessions").send({
            email: "admin@email.com",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Descriptions",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
