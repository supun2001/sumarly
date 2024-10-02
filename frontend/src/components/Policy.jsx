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
            {/* Return Policy Section */}
            <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                Return Policy
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Refunds
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Since our service operates on a monthly subscription basis with digital content processing, we do not offer refunds once a subscription plan has been activated. Users are encouraged to fully explore our free plan before committing to a paid subscription. 
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Cancellation
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                You may cancel your subscription at any time. Upon cancellation, you will continue to have access to the service until the end of your billing cycle, after which your subscription will not be renewed. No partial refunds will be provided for unused minutes or early cancellations of paid plans.You may cancel your plan at any time, but please note that <b>if you cancel, you are still responsible for paying the full fees for the current billing cycle.</b>
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Contact for Assistance
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                If you believe you have been charged in error or encounter any issues with billing, please contact our support team at <b>hanzstudio.contact@gmail.com</b> for assistance. We will review refund requests on a case-by-case basis in exceptional circumstances, such as duplicate payments.
            </Typography>

            {/* Privacy Policy Section */}
            <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mt: 4 }}>
                Privacy Policy
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Information We Collect
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We collect personal data such as your name, email address, and payment information when you sign up for our service. Additionally, we may collect usage data, such as uploaded files (audio or video), user activity, and interaction with the app.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                How We Use Your Data
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Your data is used to:
                <ul>
                    <li>Process and manage your subscription.</li>
                    <li>Provide and improve our service.</li>
                    <li>Personalize your experience on the platform.</li>
                    <li>Communicate important updates about your account or the service.</li>
                </ul>
                We do not share or sell your personal information to third parties, except when required for processing payments or complying with legal obligations.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Data Security
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We use industry-standard security measures to protect your data. However, no method of data transmission or storage is 100% secure. We are committed to ensuring the safety of your information and will notify you of any potential data breaches.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Your Rights
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                You can request to access, update, or delete your personal data at any time by contacting our support team at <b>hanzstudio.contact@gmail.com</b>. You also have the right to opt out of marketing communications.
            </Typography>

            {/* Terms and Conditions Section */}
            <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mt: 4 }}>
                Terms and Conditions
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                1. General Terms
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                By using our service, you agree to the terms outlined on this page. We offer subscription plans based on the amount of content you can upload each month, with different pricing tiers. These Terms and Conditions govern your access to and use of our service.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                2. Subscriptions
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                <ul>
                    <li><strong>Free Plan</strong>: $0/month, with a 15-minute limit on video uploads.</li>
                    <li><strong>Professional Plan</strong>: $15/month, with a 1000-minute upload limit.</li>
                    <li><strong>Enterprise Plan</strong>: Custom pricing based on specific needs.</li>
                </ul>
                All plans are billed on a recurring monthly basis unless canceled by the user. If you exceed the limits of your plan, additional usage will be subject to restrictions unless you upgrade to a higher plan.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                3. User Responsibilities
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                You are responsible for ensuring that the content you upload complies with our guidelines, does not infringe any third-party rights, and is lawful. Any misuse of the service may result in suspension or termination of your account.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                4. Intellectual Property
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                All content and services provided through our platform are the intellectual property of <b>Hanz Studio</b>. You are granted a limited, non-transferable license to use the service for personal or business purposes, depending on your subscription plan.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                5. Payment Terms
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Payment for all subscriptions is due at the start of each billing cycle. We reserve the right to suspend or terminate your access to the service if payment is not made. For custom enterprise plans, billing terms will be discussed on a case-by-case basis.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                6. Changes to Terms
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page, and continued use of the service after such changes constitutes acceptance of the updated terms.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                7. Limitation of Liability
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We strive to maintain an uninterrupted service but cannot guarantee 100% uptime or accuracy of the summaries. We are not liable for any damages resulting from the use of the service, including but not limited to data loss, technical issues, or content inaccuracies.
            </Typography>
        </Box>
    );
}
