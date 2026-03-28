// ====================================
// Backend Testing Tool
// Usage: node test-backend.js
// ====================================

const http = require('http');

const BASE_URL = 'http://localhost:3000';
const tests = [];
let passedTests = 0;
let failedTests = 0;

// Utility function to make HTTP requests
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(responseData);
                    resolve({
                        status: res.statusCode,
                        data: jsonData,
                        headers: res.headers
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: responseData,
                        headers: res.headers
                    });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// Test function
function addTest(name, fn) {
    tests.push({ name, fn });
}

// Run tests
async function runTests() {
    console.log(`
╔════════════════════════════════════════╗
║  Estcode Backend Test Suite            ║
╚════════════════════════════════════════╝
    
Testing endpoint: ${BASE_URL}
    `);

    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        console.log(`\n[${i + 1}/${tests.length}] ${test.name}`);
        console.log('─'.repeat(50));

        try {
            await test.fn();
            console.log('✓ PASSED\n');
            passedTests++;
        } catch (error) {
            console.log(`✗ FAILED: ${error.message}\n`);
            failedTests++;
        }
    }

    // Summary
    console.log('═'.repeat(50));
    console.log(`
Test Results:
  ✓ Passed: ${passedTests}/${tests.length}
  ✗ Failed: ${failedTests}/${tests.length}
  `);

    if (failedTests === 0) {
        console.log('✅ All tests passed! Backend is working correctly.\n');
    } else {
        console.log('❌ Some tests failed. Check the server logs.\n');
    }
}

// ====================================
// TEST CASES
// ====================================

addTest('1. Server Health Check', async () => {
    const response = await makeRequest('GET', '/api/health');
    if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (!response.data.status) {
        throw new Error('Missing status field in response');
    }
    console.log(`   Response: ${JSON.stringify(response.data)}`);
});

addTest('2. Submit Product Enquiry', async () => {
    const testData = {
        name: 'Test Corporation',
        email: 'test@testcorp.com',
        product: 'Brass Handicrafts',
        quantity: '500',
        message: 'We are interested in bulk orders of premium brass handicrafts'
    };

    const response = await makeRequest('POST', '/api/product-enquiry', testData);
    if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (!response.data.success) {
        throw new Error(`Server returned success: false. Message: ${response.data.error}`);
    }
    if (!response.data.id) {
        throw new Error('Missing ID in response');
    }
    console.log(`   Enquiry ID: ${response.data.id}`);
    console.log(`   Message: ${response.data.message}`);
});

addTest('3. Submit Product Enquiry - Missing Required Field', async () => {
    const testData = {
        name: 'Incomplete Corp',
        email: 'incomplete@corp.com'
        // Missing product and message
    };

    const response = await makeRequest('POST', '/api/product-enquiry', testData);
    if (response.status !== 400) {
        throw new Error(`Expected status 400, got ${response.status}`);
    }
    if (response.data.success !== false) {
        throw new Error('Should have returned success: false');
    }
    console.log(`   Error handled correctly: ${response.data.error}`);
});

addTest('4. Get All Product Enquiries', async () => {
    const response = await makeRequest('GET', '/api/enquiries');
    if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (response.data.success !== true) {
        throw new Error('Expected success: true');
    }
    if (typeof response.data.count !== 'number') {
        throw new Error('Missing or invalid count field');
    }
    console.log(`   Total enquiries: ${response.data.count}`);
    if (response.data.count > 0) {
        console.log(`   Latest enquiry: ${response.data.enquiries[0].id}`);
    }
});

addTest('5. Submit General Inquiry', async () => {
    const testData = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Example Inc',
        message: 'I would like more information about your export services'
    };

    const response = await makeRequest('POST', '/api/inquiry', testData);
    if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (!response.data.success) {
        throw new Error(`Failed: ${response.data.error}`);
    }
    console.log(`   Inquiry ID: ${response.data.id}`);
});

addTest('6. Get All Inquiries', async () => {
    const response = await makeRequest('GET', '/api/inquiries');
    if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
    }
    console.log(`   Total inquiries: ${response.data.count}`);
});

addTest('7. Email Validation in Product Enquiry', async () => {
    const testData = {
        name: 'Test Company',
        email: 'invalid-email',
        product: 'Test Product',
        quantity: '100',
        message: 'Test'
    };

    const response = await makeRequest('POST', '/api/product-enquiry', testData);
    if (response.status !== 400) {
        throw new Error(`Expected status 400 for invalid email, got ${response.status}`);
    }
    if (!response.data.error.includes('valid email')) {
        throw new Error('Expected email validation error');
    }
    console.log(`   Email validation working: ${response.data.error}`);
});

// ====================================
// RUN ALL TESTS
// ====================================

console.log('⏳ Waiting 1 second before starting tests...\n');
setTimeout(() => {
    runTests().catch(err => {
        console.error('Test suite error:', err);
        process.exit(1);
    });
}, 1000);
