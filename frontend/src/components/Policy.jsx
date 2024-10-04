import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PoliciesPage() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            mx="auto"
            bgcolor="background.default"
            p={2}
            mb={2}
        >
            {/* Refund Policy Section */}
            <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                Refund Policy
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Thank you for choosing <b>Sumarly</b>. We are committed to your satisfaction. Below is our refund policy:
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Returns
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We operate on a monthly subscription basis for digital content processing. Therefore, once a subscription plan is activated, we do not offer refunds. We encourage users to explore our free plan fully before committing to a paid subscription.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Cancellation
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                You may cancel your subscription at any time. Upon cancellation, you will continue to have access to the service until the end of your billing cycle, after which your subscription will not be renewed. No partial refunds will be provided for unused minutes or early cancellations of paid plans.You may cancel your plan at any time, but please note that if you cancel, you are still responsible for paying the full fees for the current billing cycle.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Contact for Assistance
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                For any billing issues or if you believe you’ve been charged in error, please contact our support team at <b>hanzstudio.contact@gmail.com</b>. Refund requests will be reviewed on a case-by-case basis under exceptional circumstances, such as duplicate payments.
            </Typography>

            <hr style={{ margin: '2rem 0' }} />

            {/* Privacy Policy Section */}
            <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mt: 4 }}>
                Privacy Policy
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                At <b>Sumarly</b>, we prioritize the privacy and security of your personal information. This Privacy Policy outlines our data practices:
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Information We Collect
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We collect personal data such as your name, email address, and payment information upon sign-up. We may also collect usage data, including uploaded files (audio or video), user activity, and interactions with the app.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                How We Use Your Data
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Your data is used to:
                <ul>
                    <li>Process and manage your subscription.</li>
                    <li>Improve our service.</li>
                    <li>Personalize your experience.</li>
                    <li>Communicate important updates regarding your account or service.</li>
                </ul>
                We do not share or sell your personal information to third parties except when required for payment processing or legal obligations.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Data Security
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We implement industry-standard security measures to protect your data. However, no method of data transmission or storage is 100% secure. We are committed to safeguarding your information and will notify you of any potential data breaches.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Your Rights
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                You can request access to, update, or delete your personal data at any time by contacting our support team at <b>hanzstudio.contact@gmail.com</b>. You may also opt-out of marketing communications.
            </Typography>

            <hr style={{ margin: '2rem 0' }} />

            {/* Terms and Conditions Section */}
            <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mt: 4 }}>
                Terms and Conditions
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Welcome to <b>Sumarly</b>. By using our service, you agree to comply with these terms. Please read them carefully.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                1. General Terms
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                By using our service, you accept these terms. We offer subscription plans based on monthly content limits with varying pricing tiers.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                2. Subscriptions
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                <ul>
                    <li><strong>Free Plan</strong>: $0/month, 15-minute limit on video uploads.</li>
                    <li><strong>Professional Plan</strong>: $15/month, 1000-minute upload limit.</li>
                    <li><strong>Enterprise Plan</strong>: Custom pricing based on specific needs.</li>
                </ul>
                All plans are billed monthly unless canceled by the user. Additional usage beyond plan limits may incur restrictions unless you upgrade.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                3. User Responsibilities
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                You are responsible for ensuring that the content you upload complies with our guidelines and does not infringe on third-party rights. Misuse of the service may result in suspension or termination of your account.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                4. Intellectual Property
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                All content and services on our platform are the intellectual property of <b>Sumarly</b>. You are granted a limited, non-transferable license to use the service per your subscription plan.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                5. Payment Terms
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Payment for all subscriptions is due at the start of each billing cycle. We reserve the right to suspend or terminate your access if payment is not made.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                6. Changes to Terms
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We may modify these Terms and Conditions at any time. Changes will be posted on this page, and continued use of the service signifies acceptance of the updated terms.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                7. Limitation of Liability
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                While we strive for uninterrupted service, we cannot guarantee 100% uptime or accuracy of summaries. We are not liable for any damages from service use, including data loss or technical issues.
            </Typography>
        </Box>
    );
}
