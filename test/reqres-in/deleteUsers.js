const assert = require('assert');
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {}


describe('delete users (DELETE)', function() {
    it('should delete a user', async function() {
        this.timeout(5000);
        const url = 'https://reqres.in/api/users/2';

        const response = await fetch(url, { method: 'DELETE' });

        const validate = ajv.compile(schema);
        const valid = validate(response);

        
        if (!valid) {
            console.log('ini adalah isi error: ', validate.errors);
        }

        assert.ok(valid, "Response should be valid");
        assert.strictEqual(response.status, 204, 'User deleted successfully');
        assert.strictEqual(response.type, 'basic');
        assert.strictEqual(response.statusText, 'No Content');
    })
});
