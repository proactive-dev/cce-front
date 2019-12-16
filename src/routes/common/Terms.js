import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { SITE_NAME } from '../../constants/AppConfigs'

class Terms extends React.Component {
  render() {
    const {intl} = this.props

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="terms.use"/></h1>
        <div className="agreementCon">
          <h2 style={{padding: '24px 0 0 0'}}>[{intl.formatMessage({id: 'last.updated'})} 29 Nov
            2018]</h2>
          <p>This agreement is between you and the service operator, <a className="jumpLink" href="/"
                                                                        target="_blank">{SITE_NAME}</a>. By using
            any services made available through {SITE_NAME} website, you agree that you have read, understood and
            accepted all of the terms and conditions contained in this Terms of Use agreement, as well as our Privacy
            Policy and Consent Form which have incorporated the General Data Protection Regulation (GDPR) regulation. As
            this is a legally binding contract, please carefully read through this agreement and related notices before
            using any of our Services. By registering, accessing or using {SITE_NAME}, you have agreed to the terms
            and conditions as laid out in this User Agreement. Should you disagree to this User Agreement, please
            proceed to initiate the account lock function (for existing users) and stop the usage
            of {SITE_NAME} and any of its services.</p>
          <p>For more information on {SITE_NAME}, you can refer to the company and license information found on the
            website. If you have questions regarding this agreement, please feel free to contact {SITE_NAME} for
            clarification via our Customer Support team. </p>
          <h3>Agreement Conditions </h3>
          <p>{SITE_NAME} reserves the right to modify or change the terms and conditions of the agreement at any
            time and at its sole discretion. {SITE_NAME} will provide notice of these changes in the updated Terms
            of Use and change the “[Last updated: ]” date on this page. Any and all modifications or changes to the
            Terms of Use will be effective immediately upon being announced on the website or released to users. As
            such, your continued use of {SITE_NAME}’s services acts as acceptance of the amended agreement and
            rules.</p>
          <h3>Eligibility</h3>
          <p>By registering to use a {SITE_NAME} Account, you have affirmed that you are at least 18 years old and
            are an individual, legal person or other organization with full legal capacity to enter into this User
            Agreement between you and {SITE_NAME}. If you are not, you and your guardian shall undertake all
            consequences resulting from your actions and {SITE_NAME} shall have the right to cancel or freeze your
            account in addition to filing claims against you and your guardian for compensation.</p>
          <h3>Prohibition of use</h3>
          <p>By accessing and using {SITE_NAME} and any of its services, you acknowledge and declare that you are
            not on any trade or economic sanctions lists, such as the UN Security Council Sanctions list or OFAC (Office
            of Foreign Assets Control of the U.S. Treasury Department). {SITE_NAME} maintains the right to select
            its markets and jurisdictions to operate and may restrict or deny its services to certain countries. The
            content of this Agreement shall not be excluded from the laws of the country under which the user
            belongs. {SITE_NAME} maintains its stance that prohibited users are not to use or
            access {SITE_NAME} and any of its services.</p>
          <h3>Description of services</h3>
          <p>{SITE_NAME} provides an online digital asset trading platform (crypto to crypto) for products commonly
            known as cryptographic tokens, digital tokens or cryptographic currency. {SITE_NAME} does not provide
            fiat trading capabilities on its platform and as such is not subjected to the stringent regulations that
            come with it. {SITE_NAME} functions as a trading platform provider and is not a buyer or seller in
            trades made between traders. {SITE_NAME} is also not a market maker. Traders must register and open an
            account with {SITE_NAME} and deposit digital assets prior to commencement of trading. Traders may
            request the withdrawal of their digital assets, subject to the limitations as stated in the Terms and
            Conditions.</p>
          <p>{SITE_NAME} strives to maintain the accuracy of information posted on its website however it cannot
            guarantee the accuracy, suitability, reliability, completeness, performance or fitness for purpose of the
            content through the website, and will not accept liability for any loss or damage that may arise directly or
            indirectly from the content. Information on {SITE_NAME} website can be subjected to change without
            notice and is provided for the primary purpose of facilitating users to arrive at independent
            decisions. {SITE_NAME} does not provide investment or advisory advice and will have no liability for
            the use or interpretation of information as stated in its website or other communication mediums. All users
            of {SITE_NAME} must understand that there are risks involved in trading. {SITE_NAME} encourages
            all users to exercise prudence and trade responsibly within their own means.</p>
          <p>While {SITE_NAME} emphasises platform security to ensure the continuity and security of its services
            (announcements will be made in event of downtime/maintenance), it will be non-accountable to Act of God,
            malicious targeted hacking, terrorist attacks and other unforeseen circumstances. {SITE_NAME} reserves
            the right to cancel, rollback or block transactions of all type on its platform in event of abnormal
            transactions. {SITE_NAME} will not ask for any password from its users nor ask users to transfer funds
            that are not listed on its trading platform. Users are encouraged to exercise prudence in dealing with
            discounts or promotions that could lead to them getting scammed. While the list is non-exhaustive, you agree
            that {SITE_NAME} will not be held responsible for any losses arising from the situations stated
            above. </p>
          <p>By using {SITE_NAME} and any of its services, you declare that all information to {SITE_NAME} in
            connection with these Terms are true, accurate and complete.</p>
          <h3>Account Registration &amp; Requirements</h3>
          <h5>Registration </h5>
          <p>All users must <a className="jumpLink" href="/register" target="_blank"
                               rel="noopener noreferrer">register</a> for a {SITE_NAME} Account before using the
            site. To register for an account, you must provide your real name, email address and password, as well as
            accept the Terms of Use, Privacy Policy and Consent Form. Depending on certain conditions and in our sole
            discretion, we may refuse to open an account for you.</p>
          <h5>User Identity Verification</h5>
          <p>With registration of an account on {SITE_NAME}, you agree to share personal information requested for
            the purposes of identity verification. This information is used specifically for the detection of money
            laundering, terrorist financing, fraud and other financial crimes on the {SITE_NAME} platform. In
            addition to providing this information, to facilitate compliance with global industry standards for data
            retention, you agree to permit us to keep a record of such information for the lifetime of your account plus
            5 years beyond account closing. You also authorise us to make inquiries, either directly or through third
            parties, that are deemed necessary to verify your identity or to protect you and/or us against financial
            crimes such as fraud. </p>
          <p>The Identity Verification information we request may include, but is not limited to, your: Name, Email
            Address, Contact Information, Telephone Number, Username, Government Issued ID. In providing this required
            information, you confirm that it is accurate and authentic. Post-registration, you must guarantee that the
            information is truthful, complete and updated in a timely manner with any changes. If there is any
            reasonable doubt that any information provided by you is wrong, untruthful, outdated or
            incomplete, {SITE_NAME} shall have the right to send you a notice to demand corrections, remove
            relevant information directly and, as the case may be, terminate all or part of {SITE_NAME} Service to
            you. You shall be solely and fully responsible for any loss or expenses incurred during the use
            of {SITE_NAME} Service if you cannot be reached through the contact information provided. You hereby
            acknowledge and agree that you have the obligation to keep all information provided up to date if there are
            any changes.</p>
          <h5>Account Usage Requirements</h5>
          <p>{SITE_NAME} accounts can only be used by the person whose name they are registered
            under. {SITE_NAME} reserves the right to suspend, freeze or cancel accounts that are used by persons
            other than the persons whose names they are registered under. Accordingly, {SITE_NAME} will not take
            legal responsibility for these accounts.</p>
          <h5>Account Security</h5>
          <p>{SITE_NAME} prioritizes maintaining the safety of those user funds entrusted to us and has implemented
            industry standard protections for our platform. With that said, there are account-level risks that are
            created by individual user actions. We request that you understand the need to independently take safety
            precautions to protect your own account and personal information.</p>
          <p>You shall be solely responsible for the safekeeping of your {SITE_NAME} account and password on your
            own, and you shall be responsible for all activities under your log-in email, {SITE_NAME} account and
            password (including but not limited to information disclosure, information posting, consent to or submission
            of various rules and agreements by clicking on the website, online renewal of agreement, etc.). </p>
          <p>You hereby agree that: <br/>
            <ul>
              <li>you will notify {SITE_NAME} immediately if you are aware of any unauthorized use of
                your {SITE_NAME} account and password by any person or any other violations to the security rules;
              </li>
              <li>you will strictly observe the security, authentication, dealing, charging, withdrawal mechanism or
                procedures of the website/service; and
              </li>
              <li>you will log out from the website by taking proper steps at the end of every visit.</li>
            </ul>
          </p>
          <p>{SITE_NAME} will not be responsible for any loss or consequences caused by your failure to comply with
            the above Account Security provision. </p>
          <h3>Dispute Resolution</h3>
          <p>{SITE_NAME} reserves the right to resolve issues and disputes at its sole discretion. Some issues
            include infringement of others’ rights, violation of laws and regulations, abnormal trades and others not
            explicitly mentioned in the Terms. Users agree to bear the costs arising from the process of dispute
            resolution.</p>
          <h3>Guidelines for usage of services on {SITE_NAME}</h3>
          <p>You hereby agree to observe the following covenants during your use of services on {SITE_NAME}: <br/>
            <ul>
              <li>All the activities that you carry out during the use of {SITE_NAME} Service will be in compliance
                with the requirements of applicable laws, regulations, as well as the various guidelines
                of {SITE_NAME},
              </li>
              <li>will not be in violation of public interests, public ethics or other’s legitimate interests,</li>
              <li>will not constitute evasion of payable taxes or fees and will not violate this agreement or relevant
                rules.
              </li>
            </ul>
            If you violate the foregoing promises and thereby cause any legal consequence, you shall independently
            undertake all of the legal liabilities in your own name and indemnify {SITE_NAME} from all actions,
            claims, or costs arising from such violation.
            You will not use any data or information displayed on the site for commercial purposes without the prior
            written consent of {SITE_NAME}.
            You will use the site in accordance with the Terms of Use and Privacy Policy, without taking acts of unfair
            competition nor attempting to intervene with the normal operation of {SITE_NAME}. Examples of such
            malicious acts include, but are not limited to<br/>
            <ul>
              <li>using a device, software or subroutine to interfere with the site</li>
              <li>overloading network equipments with unreasonable data loading requests</li>
              <li>executing malicious sales or purchases on the market</li>
            </ul>
            By accessing the {SITE_NAME} Service, you agree that {SITE_NAME} shall have the right to
            unilaterally determine whether you have violated any of the above covenants and take actions to apply
            relevant rules without receiving your consent or giving prior notice to you. Examples of such actions
            include, but are not limited to<br/>
            <ul>
              <li>block and close order requests</li>
              <li>freezing your account</li>
              <li>reporting the incident to authorities</li>
              <li>publishing the alleged violations and actions that have been taken</li>
              <li>deleting any information you published that is in violation</li>
            </ul>
          </p>
          <p>If your alleged violation causes any losses to a third party, you shall solely undertake all the legal
            liabilities in your own name and hold {SITE_NAME} harmless from any loss, fine or extra expenses. If,
            due to any alleged violation {SITE_NAME} incurs any losses, is claimed by any third party for
            compensation or suffers any punishment imposed by any administrative authorities, you shall
            indemnify {SITE_NAME} against any losses and expense caused thereby, including reasonable attorney’s
            fee.</p>
          <h3>Service fees</h3>
          <p>{SITE_NAME} reserves the rights to levy service fees on users who use its services. It is in the
            discretion of {SITE_NAME} to adjust the servce fees charged to users using its services.</p>
          <h3>Liability</h3>
          <h5>Provision of Service</h5>
          <p>{SITE_NAME} will provide {SITE_NAME} Service at an “as is” and “commercially available”
            condition, and does not offer any form of warranty with regards to the Service’s reliability, stability,
            accuracy and completeness of the technology involved. {SITE_NAME} serves merely as a venue of
            transactions where coin-related information can be acquired and coin-related transactions can be
            conducted. {SITE_NAME} cannot control the quality, security or legality of the coin involved in any
            transaction, truthfulness of the transaction information, or capacity of the parties to any transaction to
            perform their obligations under the rules. You must carefully consider the associated investment risks,
            legal status and validity of the transaction information and investment decisions prior to your use of
            the {SITE_NAME} Services provided.</p>
          <h5>Limitation of Liability </h5>
          <p>You acknowledge and agree, {SITE_NAME} shall not be liable for any of your losses caused by any of the
            following events, including but not limited to:<br/>
            <ul>
              <li>Losses of profits, goodwill, usage or data or any other intangible losses</li>
              <li>Use or failure to use {SITE_NAME} Service</li>
              <li>Unauthorized use of your account or unauthorized alteration of your data by third parties</li>
              <li>Your misunderstanding of {SITE_NAME} Service</li>
              <li>Any other losses related to {SITE_NAME} Service which are not directly attributable
                to {SITE_NAME}</li>
            </ul>
          </p>
          <p>In no event shall {SITE_NAME} be liable for any failure or delay of service resulting from regular
            network maintenance or external factors such as power failure, natural disaster, service provider-side
            problems or governmental acts.</p>
          <h5>Indemnification</h5>
          <p>You agree to indemnify and hold harmless {SITE_NAME}, its affiliates, contractors, licensors, and
            their respective directors, officers, employees and agents from and against any claims and damages
            (including attorneys’ fees, fines or penalties imposed by any regulatory authority) arising out of your
            breach or our enforcement of this Agreement. This shall also apply to your violation of any applicable law,
            regulation, or rights of any third party during your use of the {SITE_NAME} Service. </p>
          <h3>Announcements</h3>
          <p>Please be aware that all official announcements, news, promotions, competitions and airdrops will be listed
            on the <a className="jumpLink" href="/news" target="_blank" rel="noopener noreferrer">News</a> page where we
            urge all users to refer to regularly. {SITE_NAME} will not be held liable or responsible in any manner
            of compensation should users incur personal losses arising from ignorance or negligence of the
            announcements.</p>
          <h3>Termination of Agreement</h3>
          <p>You agree that we have the right to immediately suspend your account (and any accounts beneficially owned
            by related entities or affiliates), freeze or lock the funds in all such accounts, and suspend your access
            to {SITE_NAME} if we suspect any such accounts to be in violation of the Terms of Service, Privacy
            Policy, AML/CTF acts or any applicable laws &amp; regulations. {SITE_NAME} shall have the right to keep
            and use the transaction data or other information related to such accounts. The above account controls may
            also be applied in the following cases:<br/>
            <ul>
              <li>The account is subject to a governmental proceeding, criminal investigation or other pending
                litigation
              </li>
              <li>We detect unusual activity in the account</li>
              <li>We detect unauthorized access to the account</li>
              <li>We are required to do so by a court order or command by a regulatory/government authority</li>
            </ul>
            In case of any of the following events, {SITE_NAME} shall have the right to directly terminate this
            agreement by cancelling your account, and shall have the right to permanently freeze (cancel) the
            authorizations of your account on {SITE_NAME} and withdraw the corresponding {SITE_NAME} account
            thereof: <br/>
            <ul>
              <li>after {SITE_NAME} terminates services to you,</li>
              <li>you allegedly register or register in any other person’s name as {SITE_NAME} user again, directly
                or indirectly;
              </li>
              <li>the main content of user’s information that you have provided is untruthful, inaccurate, outdated or
                incomplete;
              </li>
              <li>when this agreement (including the rules) is amended, you expressly state and
                notify {SITE_NAME} of your unwillingness to accept the amended service agreement;
              </li>
              <li>any other circumstances where {SITE_NAME} deems it should terminate the services.</li>
            </ul>
            Should the account be terminated, the account &amp; transactional information required for meeting data
            retention standards will be securely stored for five years. In addition, if a transaction is unfinished
            during the account termination process, {SITE_NAME} shall have the right to notify your counterparty of
            the situation at that time.
          </p>
          <h5>Remaining funds after account termination (normal)</h5>
          <p>Once the account is closed/withdrawn, all remaining balance (which includes charges and liabilities owed
            to {SITE_NAME}) on the account will be payable at once to {SITE_NAME}. Upon payment of all
            outstanding charges to {SITE_NAME} (if any), the user will have 5 working days to withdraw all funds
            from the account.</p>
          <h5>Remaining funds after account termination (fraud/AML/violation of terms)</h5>
          <p>{SITE_NAME} maintains full custody of the funds and user data/information which may be turned over to
            the authorities in event of account suspension/closure arising from fraud investigations, AML investigations
            or violation of {SITE_NAME}’s Terms (eg. trading on {SITE_NAME} from a sanctioned country). </p>
          <h3>Compliance with local laws</h3>
          <p>It is the responsibility of the user to abide by local laws in relation to the legal usage
            of {SITE_NAME} in their local jurisdiction. Users must also factor, to the extent of their local law
            all aspects of taxation, the withholding, collection, reporting and remittance to their appropriate tax
            authorities. All users of {SITE_NAME} and any of its services acknowledge and declare that the source
            of their funds come from a legitimate manner and are not derived from illegal
            activities. {SITE_NAME} maintains a stance of cooperation with law enforcement authorities globally and
            will not hesitate to seize, freeze, terminate the account and funds of users which are flagged out or
            investigated by legal mandate.</p>
          <h3>Privacy Policy</h3>
          <p>{SITE_NAME} may announce and amend its privacy policy on the platform of {SITE_NAME} from time to
            time and the privacy policy shall be an integral part of this Usage Agreement. The latest version of the
            Privacy Policy which has included the GDPR can always be found here on <a className="jumpLink"
                                                                                      href="/privacy" target="_blank"
                                                                                      rel="noopener noreferrer">Privacy</a> page.
          </p>
          <h3>Indemnity and disclaimer</h3>
          <p>You agree to indemnify {SITE_NAME} and its entirety of affiliates and hold them harmless from and
            against all third party claims except from {SITE_NAME}’s breach of these Terms. As mentioned in
            description of services, {SITE_NAME} strives its best to maintain the data integrity on its site but
            does not guarantee the information and services provided in its platform. {SITE_NAME} will not be
            liable for errors arising from the use of its services.</p>
          <h3>Complaints</h3>
          <p>If you have any complaints, feedback or questions, kindly contact and we will in our best efforts try to
            resolve it for you.</p>
        </div>
      </div>
    )
  }
}

export default injectIntl(Terms)
