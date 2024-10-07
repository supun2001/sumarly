import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

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
            
            {/* Refund*/}
            <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                Refund Policy
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Thank you for choosing <b>Sumarly</b>. We value your satisfaction and strive to provide you with the best online summariser experience possible. If, for any reason, you are not completely satisfied with your purchase, we are here to help.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Retrun
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We operate on a monthly subscription basis for digital content processing. Once a subscription plan is activated, we do not offer refunds. However, if you receive a refund, we will give you back the money for the last month. We encourage users to explore our free plan fully before committing to a paid subscription.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Refunds 
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                <ul>
                    <li>Monthly Subscription Refunds</li>
                    <ul>
                        <li>
                            We do not offer refunds for partial months or unused time within your billing cycle once a payment has been processed. However, if you have any issues with our service, please reach out to us at <b>hanzstudio.contact@gmail.com</b>, and we’ll work to resolve the matter.
                        </li>
                    </ul>
                    <li>
                        Exceptions for Refunds
                        <ul>
                            <li>Refunds may be considered in specific situations, such as:</li>
                            <ul>
                                <li>Service interruptions lasting longer than 48 hours.</li>
                                <li>Billing errors or duplicate charges.</li>
                            </ul>
                            <li>In such cases, we will refund the previous month’s payment, rather than any partial month amount.</li>
                        </ul>
                    </li>
                </ul>
            </Typography>



            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Cancellation
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                You may cancel your subscription at any time. Upon cancellation, you will continue to have access to the service until the end of the current month, after which your subscription will not renew. No partial refunds will be provided for unused minutes or early cancellations of paid plans. If you cancel, you are still responsible for paying the full fees for the month in which you cancel.
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
                At <b>Sumarly</b>,  we are committed to protecting the privacy and security of our customers' personal information. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit or make a purchase on our website. By using our website, you consent to the practices described in this policy.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Information We Collect
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We collect personal data such as your name, email address, and payment information upon sign-up. We may also collect usage data, including uploaded files (audio or video), user activity, and interactions with the app.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Information Sharing
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We respect your privacy and do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                <ul>
                    <li><b>Trusted service providers:</b> We may share your information with third-party service providers who assist us in operating our website, processing payments, and delivering products. These providers are contractually obligated to handle your data securely and confidentially.</li>
                    <li><b>Legal requirements:</b> We may disclose your information if required to do so by law or in response to valid legal requests or orders.</li>
                </ul>
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
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Local storage and Tracking Technologies
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We use local storage and similar technologies to enhance your browsing experience, analyze website traffic, and gather information about your preferences and interactions with our website.
            </Typography>


            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Your Rights
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                You can request access to, update, or delete your personal data at any time by contacting our support team at <b>hanzstudio.contact@gmail.com or Profile page</b>. You may also opt-out of marketing communications.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Changes to the Privacy Policy
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with a revised "last updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Contact Us
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                If you have any questions, concerns, or requests regarding our Privacy Policy or the handling of your personal information, please contact us using the information provided on our website.
            </Typography>

            <hr style={{ margin: '2rem 0' }} />

            {/* Terms and Conditions Section */}
            <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mt: 4 }}>
                Terms and Conditions
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Welcome to <b>Sumarly</b>. These Terms and Conditions govern your use of our website and the purchase and sale of service from our platform. By accessing and using our website, you agree to comply with these terms. Please read them carefully before proceeding with any transactions.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Use of the Website
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                <ul>
                    <li>You are responsible for maintaining the confidentiality of your account information, including your username and password.</li>
                    <li>You agree to provide accurate and current information during the registration and checkout process.</li>
                    <li>You may not use our website for any unlawful or unauthorized purposes.</li>
                </ul>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Product Information
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We do not guarantee the accuracy or completeness of such information.
            </Typography>


            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Product Information
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Prices are subject to change without notice. Any promotions or discounts are valid for a limited time and may be subject to additional terms and conditions.
                <ul>
                    <li><strong>Free Plan</strong>: $0/month, 15-minute limit on video uploads.</li>
                    <li><strong>Professional Plan</strong>: $15/month, 1000-minute upload limit.</li>
                    <li><strong>Enterprise Plan</strong>: Custom pricing based on specific needs.</li>
                </ul>
                All plans are billed monthly unless canceled by the user. Additional usage beyond plan limits may incur restrictions unless you upgrade.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Returns and Refunds
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Our Returns and Refund Policy outlines the conditions for canceling subscriptions and requesting refunds for digital services. Please refer to the full policy on our website for detailed information.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Intellectual Property
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                All content and materials on our website, including but not limited to text, images, logos, and graphics, are protected by intellectual property rights and are the property of https://www.sumarly.com or its licensors.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                User Responsibilities
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                You are responsible for ensuring that the content you upload complies with our guidelines and does not infringe on third-party rights. Misuse of the service may result in suspension or termination of your account.
            </Typography>


            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Payment Terms
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                Payment for all subscriptions is due at the beginning of each billing cycle. If payment is not received, we may need to suspend or terminate your access. Should you encounter any issues, please feel free to reach out to us at <b>hanzstudio.contact@gmail.com</b> — we’ll get back to you as soon as possible.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Changes to Terms
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                We may modify these Terms and Conditions at any time. Changes will be posted on this page, and continued use of the service signifies acceptance of the updated terms.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Limitation of Liability
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                While we strive for uninterrupted service, we cannot guarantee 100% uptime or accuracy of summaries. We are not liable for any damages from service use, including data loss or technical issues.
            </Typography>
        </Box>
    );
}
