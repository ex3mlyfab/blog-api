const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../../index")
require("dotenv").config();
const { reqaddBlog, requpdateBlog } = require("../utils/data/blog.test.data.js");

const token = process.env.JWT_SECRET;
let blogId =
//Create blog Test 
describe("POST /api/blog/create", () => {
    test("should create a blog", async () => {
        return request(app)
            .post("/api/blog/create")
            .set('Authorization',  `Bearer ${token}`)
            .send(reqaddBlog)
            .expect(201)
            .then(({ body })=>{
                blogId = body.data.blogId
            })

    });
});


describe("GET /api/blog/get", () => {
    test("should return all blogs", async () => {
        return request(app)
            .get("/api/blog/get")
            .expect('Content-Type', /json/)
            .expect(200)
    });
});

describe("GET /api/blog/show/:id", () => {
    test('should return all blogs', async () => {
        return request(app)
            .get(`/api/blog/show/${blogId}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });
})

describe("PUT /api/blog/update/:id", () => {
    test("should update a blog", async () => {
        return request(app)
            .put(`/api/blog/update/${blogId}`)
            .set('Authorization',  `Bearer ${token}`)
            .send(requpdateBlog)
            .expect(201)
    });
});

describe("Checking authorization middleware", () => {
    test("should create a blog", async () => {
        return request(app)
            .post("/api/blog/create")
            .send(reqaddBlog)
            .expect(401)
    });
});

describe("DELETE /api/blog/delete/:id", () => {
    test("should create a blog", async () => {
        return request(app)
            .delete(`/api/blog/delete/${blogId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(410)
    });
});