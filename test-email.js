// Test email configuration
const nodemailer = require('nodemailer');

async function testEmailConfiguration() {
    console.log('🔍 Testing Email Configuration...\n');
    
    const emailConfig = {
        user: process.env.EMAIL_USER || 'contact@estcode.in',
        pass: process.env.EMAIL_PASS || 'exxjdhgqepxggmqy'
    };
    
    console.log('📧 Email Configuration:');
    console.log(`   From: ${emailConfig.user}`);
    console.log(`   SMTP: smtp.gmail.com (Port 587)\n`);
    
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass
            }
        });
        
        // Verify connection
        console.log('🔗 Verifying SMTP connection...');
        await transporter.verify();
        console.log('✅ SMTP connection verified!\n');
        
        // Send test email
        console.log('📨 Sending test email...');
        const info = await transporter.sendMail({
            from: emailConfig.user,
            to: emailConfig.user,
            subject: '✓ Email System Test - Estcode',
            html: `
                <h2>✅ Email System is Working!</h2>
                <p>This is a test email from your Estcode backend.</p>
                <p>When customers submit the inquiry or product enquiry form:</p>
                <ul>
                    <li>Their data will be saved to the database</li>
                    <li>You will receive an email at <strong>${emailConfig.user}</strong></li>
                    <li>CC will be sent to: <strong>${process.env.EMAIL_CC || 'smlakhteyh.exp@gmail.com'}</strong></li>
                </ul>
                <hr>
                <p><strong>Test Details:</strong></p>
                <p>Sent at: ${new Date().toISOString()}</p>
            `
        });
        
        console.log('✅ Test email sent successfully!');
        console.log(`   Message ID: ${info.messageId}\n`);
        
        console.log('🎉 Email System Configuration Status: READY');
        console.log('\n📋 Summary:');
        console.log('   ✓ SMTP connection working');
        console.log('   ✓ Email credentials valid');
        console.log('   ✓ Emails will be sent to: ' + emailConfig.user);
        console.log('   ✓ Form submissions will trigger email notifications\n');
        
    } catch (error) {
        console.error('❌ Email Configuration Error:');
        console.error(error.message);
        console.log('\n⚠️  Please verify:');
        console.log('   1. EMAIL_USER and EMAIL_PASS in .env are correct');
        console.log('   2. If using Gmail, enable "Less secure apps" or use App Password');
        console.log('   3. Internet connection is stable');
    }
}

testEmailConfiguration();
