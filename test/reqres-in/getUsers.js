const assert = require('assert');
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "page": {
            "type": "number"
        },
        "per_page": {
            "type": "number"
        },
        "total": {
            "type": "number"
        },
        "total_pages": {
            "type": "number"
        },
        "data": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number"
                    },
                    "email": {
                        "type": "string"
                    },
                    "first_name": {
                        "type": "string"
                    },
                    "last_name": {
                        "type": "string"
                    },
                    "avatar": {
                        "type": "string"
                    }
                },
                "required": [
                    "id",
                    "email",
                    "first_name",
                    "last_name",
                    "avatar"
                ]
            }
        },
        "support": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string"
                },
                "text": {
                    "type": "string"
                }
            },
            "required": [
                "url",
                "text"
            ]
        }
    },
    "required": [
        "page",
        "per_page",
        "total",
        "total_pages",
        "data",
        "support"
    ]
};

describe('get users (GET)', function() {
    it('should get all users', async function() {
        this.timeout(5000);
        const url = 'https://reqres.in/api/users?page=2';

        const response = await fetch(url);
        const data = await response.json();
        const validate = ajv.compile(schema);

        const valid = validate(data);
        if (!valid) {
            console.log('ini adalah isi error: ', validate.errors);
        }

        assert.ok(valid, "respone JSON should be valid");
        assert.strictEqual(response.status, 200, 'Users fetched successfully');
        assert.ok(Array.isArray(data.data), 'Response should be an array');
    })

})