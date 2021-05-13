import React from 'react';
import methodRSA from './Symmetric-Encryption.png'


const Asymetric = (state, props) => {
    // DIGITAL SIGNING HELP FILE

    return (
        <>
            <h3> ASYMETRIC ENCRYPTION</h3>
            <h5>
                <i>
                    🔑 Public / Private key encryption 
                </i>
            </h5>
            <h6>Brievely</h6>
            <p>
                Public key encryption, in which a message is encrypted with a recipient's public key. 
                The message cannot be decrypted by anyone who does not possess the matching private key, 
                who is thus presumed to be the owner of that key and the person associated with the public key. 
            </p>
            <h6>Working Principle</h6>
            <img src={methodRSA} alt='explanation'/>
            <p>
                🕵️
                Whereas in asymmetric encryption there are two keys which are used to communicate and these keys are known as a private key and public key.

                This is also used to share messages between the two parties but without the need of sending another party, the private keys.

                Hence this method is more secure because, in asymmetric key cryptography, the private key is kept by the sender and it usually takes a long time in encryption.

                A public key is only used to encrypt the messages and cannot be used to decrypt those messages. That’s the reason public key stays public and can be given to anyone from whom you want to receive the message or a cryptocurrency transaction.

                A private key is intended to be private and is used to decrypt the messages encrypted with the linked public key.
            </p>
        </>
    );

}

export default Asymetric;