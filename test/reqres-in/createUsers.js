const assert = require('assert');
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "job": {
            "type": "string"
        },
        "id": {
            "type": "string"
        },
        "createdAt": {
            "type": "string"
        }
    },
    "required": [
        "name",
        "job",
        "id",
        "createdAt"
    ]
}

describe('CREATE USERS', function() {
    it('should create a user', async function() {
        this.timeout(5000);
        const url = 'https://reqres.in/api/users';
        const payload = {
            "name": "morpheus",
            "job": "leader"
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const validate = ajv.compile(schema);

        const valid = validate(data);
        if (!valid) {
            console.log('ini adalah isi error: ', validate.errors);
        }
        
        assert.ok(valid, "respone JSON should be valid");
        assert.strictEqual(response.status, 201, 'User created successfully');
        assert.strictEqual(data.name, 'morpheus');
        assert.strictEqual(data.job, 'leader');
    })
});
