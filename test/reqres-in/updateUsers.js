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
        "updatedAt": {
            "type": "string"
        }
    },
    "required": [
        "name",
        "job",
        "updatedAt"
    ]
}

describe('update users (PATCH)', function() {
    it('should get all users', async function() {
        this.timeout(5000);

        const url = 'https://reqres.in/api/users/2';
        const payload = {
            "name": "morpheus",
            "job": "zion resident"
        }

        const response = await fetch(url, {
            method: 'PATCH',
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
        assert.strictEqual(response.status, 200, 'User updated successfully');
        assert.strictEqual(data.name, 'morpheus');
        assert.strictEqual(data.job, 'zion resident');
        assert.strictEqual(data.updatedAt, data.updatedAt);
    });



}) 