import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { COMPANY_NAME, SITE_NAME } from '../../constants/AppConfigs'

class Privacy extends React.Component {
  render() {
    const {intl} = this.props

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="privacy"/></h1>
        <div>
          <h2 className="gx-mt-4 gx-mb-4">[{intl.formatMessage({id: 'last.updated'})} 24 May 2018]</h2>
          <p>
            This Privacy Policy explains how {COMPANY_NAME} collects, uses, shares, and protects user information
            obtained through the
            <a className="jumpLink" href="/" target="_blank">{SITE_NAME}</a>.
            The terms “we,” “us,” and “our” refer to {COMPANY_NAME} and its service, {SITE_NAME} .
            When we ask for certain personal information from users it is because we are required by law to collect
            this information or it is relevant for specified purposes.
            Any non-required information you provide to us is done so voluntarily.
            You decided whether to provide us with these non-required information;
            you may not be able to access or utilize all of our Services if you choose not to.
          </p>
          <p>
            By using the Site, you consent to the data practices described in this Privacy Policy.
            On occasion, we may revise this Privacy Policy to reflect changes in law or our personal data collection and
            use practices.
            If material changes are made to this Privacy Policy, the changes will be announced by posting on the site.
            We will ask for your consent before using your information for any purpose that is not covered in this
            Privacy Policy.
          </p>
          <p>
            The latest privacy policy has incorporated elements from the General Data Protection Regulation (GDPR) as
            we act in accordance to its personal information processing rules within the European Economic Area (EEA).
          </p>
          <h3>INFORMATION WE COLLECTS</h3>
          <h5>
            We want you to understand the types of information we collect when you register for and use {SITE_NAME}’s
            services
          </h5>
          <p>Information you provide to us at registration</p>
          <p>
            When you create a {SITE_NAME} Account, you provide us with personal information that includes your contact
            information (Email Address, name, and a password). You can also choose to add a phone number for SMS or
            Google Authenticator account to be used for 2FA verification for improved security.
          </p>
          <p>Information we collect when authenticating user identity </p>
          <p>
            To comply with global industry regulatory standards including Anti-Money Laundering (AML) and
            Know-Your-Customer (KYC), we requires user accounts to undergo user identity authentication for
            both Personal &amp; Enterprise-level accounts.
            This entails collecting formal identification.
          </p>
          <p>Information we collect as you use our services</p>
          <h5>Service Usage Information</h5>
          <p>
            Through your use of the our platform, we also monitor and collect tracking information related to usage
            such as access date &amp; time, device identification, operating system, browser type and IP address.
            This information may be directly obtained by {SITE_NAME} or through third party services.
            This service usage data helps us our systems to ensure that our interface is accessible for users
            across all platforms and can aid during criminal investigations.
          </p>
          <h5>Transaction Information</h5>
          <p>
            For all personal and enterprise user accounts, we collect transaction information including
            deposit snapshots, account balances, trade history, withdrawals, order activity and distribution history.
            This transaction data is monitored for suspicious trading activity for user fraud protection,
            and legal case resolution.
          </p>
          <h3>WHY DOES WE COLLECT THIS INFORMATION</h3>
          <p>To provide and maintain our services</p>
          <p>
            We use the information collected to deliver our services and verify user identity.<br/>
            We use the IP address and unique identifiers stored in your device’s cookies to help us authenticate your
            identity and provide our service.
            Given our legal obligations and system requirements, we cannot provide you with services without data like
            identification, contact information and transaction-related information.
          </p>
          <h5>To protect our users</h5>
          <p>
            We use the information collected to protect our platform, users’ accounts and archives.<br/>
            We use IP addresses and cookie data to protect against automated abuse such as spam, phishing and DDoS
            attacks.<br/>
            We analyse trading activity with the goal of detecting suspicious behavior early to prevent potential fraud
            and loss of funds to bad actors.<br/>
          </p>
          <h5>To comply with legal and regulatory requirements</h5>
          <p>
            Respect for the privacy and security of data you store with {SITE_NAME} informs our approach to complying
            with regulations, governmental requests and user-generated inquiries.
            We will not disclose or provide any personal information to third party sources without review from our
            legal case team and/or prior consent from the user.
          </p>
          <h5>To measure site performance</h5>
          <p>
            We actively measure and analyse data to understand how our services are used.
            This review activity is conducted by our operations team to continually improve our platform’s performance
            and to resolve issues with the user experience. <br/>
            We continuously monitor our systems’ activity information and communications with users to look for and
            quickly fix problems.
          </p>
          <h5>To communicate with you</h5>
          <p>
            We use personal information collected, like an email address to interact with users directly when providing
            customer support on a ticket or to keep you informed on log ins, transations, and security.
            Without processing your personal information for confirming each communication,
            we will not be able to respond to your submitted requests, questions and inquiries.
            All direct communications are kept confidential and reviewed internally for accuracy.
          </p>
          <h5>To enforce our Terms of Use and other agreements</h5>
          <p>
            It is very important for us and our customers that we continually review, investigate and prevent any
            potentially prohibited or illegal activities that violate our Terms of Service.
            For the benefit of our entire user base, we carefully enforce our agreements with third parties and
            actively investigate violations of our posted Terms of Use.
            We reserves the right to terminate the provision of service to any user found engaging in activities
            that violate our Terms of Use.
          </p>
          <h3>HOW DOES WE PROTECT USER DATA</h3>
          <p>
            We has implemented a number of security measures to ensure that your information is not lost, abused, or
            altered.
            Our data security measures include, but are not limited to: PCI Scanning, Secured Sockets Layered
            encryption technology, pseudonymisation, internal data access restrictions, and strict physical access
            controls to buildings &amp; files.
            Please note that it is impossible to guarantee 100% secure transmission of data over the Internet nor
            method of electronic storage.
            As such, we request that you understand the responsibility to independently take safety precautions to
            protect your own personal information.
          </p>
          <p>
            If you suspect that your personal information has been compromised, especially account and/or password
            information, please lock your account and contact our customer service immediately.
          </p>
          <h3>CONTACT US</h3>
          <p>
            We are committed to respecting the freedoms and rights of all our {SITE_NAME} users
            who have placed their trust in our service.
            If you should have any questions or concerns regarding this Privacy Policy, or if you would like to
            file a Data Protection request, please refer to our FAQ and contact us on our Support Page.
          </p>
        </div>
      </div>
    )
  }
}

export default injectIntl(Privacy)
