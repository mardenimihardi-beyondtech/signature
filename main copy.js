const forge = require('node-forge');

/**
 * Fungsi untuk generate signature
 */
const authSignature = (privateKey, partnerId, timestamp) => {
    const stringToSign = `${partnerId}|${timestamp}`;
    const formattedPrivateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;

    let privateKeyObj;
    try {
        privateKeyObj = forge.pki.privateKeyFromPem(formattedPrivateKey);
    } catch (err) {
        throw new Error(`Invalid private key: ${err}`);
    }

    const md = forge.md.sha256.create();
    md.update(stringToSign, 'utf8');

    try {
        const signature = privateKeyObj.sign(md);
        return Buffer.from(signature, 'binary').toString('base64');
    } catch (err) {
        throw new Error(`Signing failed: ${err}`);
    }
};

/**
 * Main function untuk jalanin di Node.js
 */
function main() {
    // STAGING, nama client nya; DUMMY
    const clientId = "0198dd27-bcf2-77ad-93ab-b23c1b6f43e2"
    const secretKey = "l+vtj1lXRp9ClYtRaHxgpB2fXZHVygAmjgymPZYtsBQ="
    // Generated Signature: rnqqpwCVpHrRZweI1lm32wACyeKr0ScaAKczPicgHPDQcS14vxe3sAcjIE9NUYhjWkwjnAVOj3iJX3g6mqfbtqs4xUoFaBwniMOOy+kQu9MHuYquZehWwM0+r4Jdf4Lejy8IA5RwiZcAt5pwsT0/Q6U9/FpdGfQXru5yUPlmCunLlexPihfUwWbr3SQsesJ4u/Y5vRUuBh0Sz7JBwlqVfuHMlaCYSMsL0RFjzbfTkyLcaAhW7fgDTdKbjLJBjXEMC5vcWjcDox2us+Pk6kaLHT/emxaDll+bbwCO9Q637mkwuxZDTtBGcRlt7pBcb+YzJdDeU7r2zwabc+FBzJ2PaQ==

    // const privateKey = "MIIEpQIBAAKCAQEA5LDKVsUd642Qt+1w6Rq3Z2kP/lzl8KyFj3ZB0a6F5kesSah3coaVmDXhV5MDhDffBsoAtkurm3KzAzNcV8sojU590voILt9KOkxHOgg2oHtXptqISf2ox0Vfi604Gf6/auBXQDtO6vPbTiWzSt6yfK4X1ua6UJBZ2wG4XW57CliJmIkhqkOL0REnpm92B4/eSEzW3dSY3lv7UXJdGKQuTz57u4nf1+zOfGc1v6QO2Y5bJHs1tju2wFBaNL8NEYzLt5nYF8II+iOJ3hg09T0q8/n71JCtpFs0dbbeHd/YchWcZXbJQYIRNvGe/lWjkCKpC11K2X6d6wtw4wxU4suJ9wIDAQABAoIBAAa933knXnZvOfDyIv38N6PoyPvqqSyrKVTNW6texbvAKSgSu1K4/Pf7vqTiRJxFOWHt2o+FM43ll7lkbjh4WL2xrqvlixA2rO2DCiZ/z3xzpmXY02O7Apq9RM/NT3YUuHfiHTBbjzwF7FUlb1+pqQFb8H/5VUzCtKNsLY8zjpUDcOJ/uAek0umGTHsi3ZHqAqn4s8RklPrE9ojhDOwKdUaalCIaDs3tlvrawFiksw3yyEeLHPfAd5ZQrgbuOLCDFz/95ghvMRHnuXr/QSP98+x1cO9U1VKn2e143YOTXpYjAHp96ojsZkpe6oGmFBkpkF9/R+PBdNHNdwxwfndJCKECgYEA5mImESPXSRrS+Hp9yMMSsr8+jHmwT9itFGPynqnnvXTGukFNDomr2FtuQlDaem/8kuBffBtwZjgEpoptc978o2aybYPljxcstTufLANZCo5ReDj4q7vEyyTkfs2mgnu/N4L7jC4113hJzMUBBKkpqTzrREbgnOIwKRIFMz55zx0CgYEA/h50wAvf/xaL1ODEiBASjy6Bms8o36JP2wXvVu8VT1JFkjcqJZSxvEw0a0wykFn0mdiYNk9XU9+2uHy0O405y68YcKDzEVPA2ZMBO2WORj0yIoL6gS5lCsvyTtMFoyVMgdaA7sk8bdmG1/q16bxZyiI8C3h3xC4vcOfhHW5SzSMCgYEAlUR2YZiVPjpxAqlqog8yKDoc7qtRfwpmadWwNvjiuy/UKo1wvcCZZN8oezMjuzyfqxJRC3pDwxb8fGMoM3EAw2YgqTBSJfnf77Snlr68jEhVpM1U4QARq4VFvprEDbrb0727+cFfBTJcrp3d4QUxhwN/c4dwtHUguxt/3wnVpkkCgYEAiPzgERsVsEx2KtbT+0k2yArZARxFu3CjPb3QTPvrb+w45t5oEQQ8X/Zwl5rm8xwbGMhDHZvdxrAlrwRCoIu8KUoFkcmh3qhYoLF3i45uiPy6RxJ2eicJfy18PPPS6STVPnTk4lSHB+yonUtgv1Syzp1v4vsZDR+coW/O0e/EISMCgYEAq/g/vCJ/P1l6ILLqlO/u3Snd98oGrDRZ0nLey9XFGAueLkUVejbOYKZHBuSyrx0UvcDg6eBQu2HkHHqROK7ORxfcNrIuANuCtgPXIHVtKhntcUBsJzSk0XTPT6foEkCslJPTr0zWrPZg4JysSCqVA5SBEML6nREKUSVxM2/IGOE=";
    // const clientKey = "0199565a-6196-720c-a760-55d8ab628661";
    const timestamp = "2025-06-23T11:32:02+07:00";

    const privateKey = "MIIEogIBAAKCAQEAnk/PkAthRzquTTM7WMqA6JI5OOunnjJNdx5yJ9Y2zihl9SEAWt7vUVDM8n/xinbbfU8gguiLCWYv2Sgv1BNFyVOqviSCcHYOsizlgMX0Y5sMoq+UNowL3fsYDPN64hpdFZaT2QEATNC88mUHVf8sKlY7XcfWQpx8b0Cdi7lsGKhStCVG5MYfOUn7GLcmWd9o3HTVi5C1NfIT6/GzuvDfa5VViOooa4vUGUsrIUKd96R6lXR7GX/9hEqQAHOZd7rd05Jyx8kLtAe03dniRyncI5rt9StziRzer9RnrIK5n1LvstlIg2xthuTHF+9raC4PlZhRe9fmFkt0p6AeXNu9VwIDAQABAoIBABG2Y0Y+B7XE+oB3tXGjQpYC2jUkpJ3eCe3EcchEPuCFA5dQCG6iV8tUy4FsUDWKQ9d61WvgIcI89SiKRwOm3l1+p3Fbu15izxUfUdQ9EbFdRSYkl+Qcei1tbQzx5vNKONT0Anm6k3KEvkcuh4oXITVhbYX6GF5ejMuTwqzB47bEXViwiY2lqfUzkKzojIE5VnQF78vETqvI9O/9srcx81E0c8g1SIOCmNyLMHuQRoQ7thJlrw/MW8sXvsy6JIlZedY3R563K/oo2sIDGuRHJH9P3Zx7f4OGpZiAmmIxix2LJ6GEau4Wmnr/WGV9UelGNOuXBW+8Y0Ox5Akg1+KT4BECgYEA0nnShjZc7mMp34R5NYsQ8PCGOF80ZTtfzqnaz80igG7SCXgOUItN/0csm2LY0Etwub9T3fzC44jc9rw/oyRmq+1dM6GcKxokZuc0dC3R3/IyDreL24/3/I5hBwV/uD7HcsZ5emNRo04MYs30MXh6CIli51KJkne6/O7NwMlonTECgYEAwI2hPwZ0PLGxXijBGDcUcgsqaKylIDJx/FOcbPLuvCo11HK3wLxdT1femZAghKJdvjbT4FINv1l7iGMM+Pqqr34F+ulmIMb3b09h7dUfVD7NuJjmWFfke2BW8eFfGGG9bM4RaOUQxHmvVnOkfQBD7q97StFiMTE2EdhRSp72QQcCgYATJOOCM6WmRTzEyN7hgOGsmKQMspQodQsU2Bw/9G+j8PCHzfS3XMReaNHk3EvOPl5ldsKhGWF8orE+fAbpxuDT2IY2sQdsYDdZaMQ7oQNK9FObRRSihujOfwDSS6y/TG6FwQnBmREO4oV74zHH4iZvalelpLtAqEVIxkvOskMisQKBgFwjaYU/EV/5p2XnGn773Ey2CxULh/hgKysS10dK9/ISQK/oNQWFHSFaaqoQzX6qMzFSCxDMMsfdib85pnt9dy+CnlnyVWxZyQz6b2HfGZ62brpmb9LWO/7Nms0jit2f54SpFqua8OsTT1OPAqbN+bO9RMIIb3QamETxvfR3HF8BAoGAJgPPrNS1UCY6gY3pPFWcid320jksgFPqpNsua2LlhyH3HWiHo6nt1g9ZmCt1RbeLsu7QXod0jlDG8x4kd347Q+GbCGFbN5CqBprPReOO9ZHGUOW0VjMmR5RJ+ww/nBZfczL7Ura6SPtRbxMIetJdMshBZUATQq6b2TlnlwKYu+c=";
    const clientKey = "0199568a-92b1-713d-87b0-91238ab2e7e1";

    try {
        const signature = authSignature(privateKey, clientKey, timestamp);
        console.log("Generated Signature:", signature);
    } catch (err) {
        console.error("Error:", err.message);
    }
}

// jalankan
main();
