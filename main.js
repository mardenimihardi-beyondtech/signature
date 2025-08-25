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

    // hasil generate
    // Generated Signature: rnqqpwCVpHrRZweI1lm32wACyeKr0ScaAKczPicgHPDQcS14vxe3sAcjIE9NUYhjWkwjnAVOj3iJX3g6mqfbtqs4xUoFaBwniMOOy+kQu9MHuYquZehWwM0+r4Jdf4Lejy8IA5RwiZcAt5pwsT0/Q6U9/FpdGfQXru5yUPlmCunLlexPihfUwWbr3SQsesJ4u/Y5vRUuBh0Sz7JBwlqVfuHMlaCYSMsL0RFjzbfTkyLcaAhW7fgDTdKbjLJBjXEMC5vcWjcDox2us+Pk6kaLHT/emxaDll+bbwCO9Q637mkwuxZDTtBGcRlt7pBcb+YzJdDeU7r2zwabc+FBzJ2PaQ==

    const privateKey = "MIIEowIBAAKCAQEA1j/JfU6KoJUrNtYGJyiB/k1qDmZmDnxgc6v/6HXMQFbPOhPuA4aez4nNHdEs1Vs3QdSVl+/cOnPuS3vxesYuZzeAtyVX3t+QR1W5bGP1dLJMk0qqOhwyK3myQgQmg7U4xQFldyiQCMH7xTmc9ZYQQjpEyou2hpij9VpVzTqVYbfCKrrK/h0c6xUeP7c2Zh2IzABtpCeOXQ2+EhXSKrkp66m0VJthmcHk9dYTGG4Lsljk8gSIgd+tzlRJxNwIa/ah2tMr7Qig5Yt7nvgOiUlV3h8pexfB575kPFbMwbT2C7hOJ6QcWa1W7ihf4gieb+R5fPSosR6a33LTxF38swTy3QIDAQABAoIBADGz/RamlqbvzCVty+IgNd4M0A6Up1bzeD3FeHoRf+eqK+t1jalAPQ35Ej55VR0PCvfo7SZhFRZzaCQXVhtNKB02ZVQ3o9W2yCYgZ0KTwvEGXxjpgKm3+lSXKClEBLpX25pqe0NEQ/vgIrwrpDPeExoGIgjaFidN+HV2NkME9PxEw/9M6B+r8qwD8uMXWzZVuIeMoMBmWQl4WERmXp+NjrUjg3kbKtGqBA4DDMaoaIuJN0x+9fu7Nd596faIYpHCOwJTWlbjVXYTEWoHIpEUcnvVBqk1OQv1V9Icv5+wPjl/hlofJm3sVVWzAh9ohtVU6vj80NmE+D5OJMV5f6LHvVECgYEA98BdugXchHqpfBCuE1734iS7jV2BdwgznjDkMtGDXFyH41juQFneAeCxPYbodahNFzDZxdiTlNpu78cz2HOGTBNyxxf+MOdGWkTA7VMito39j0CjM1rct/UY5r7dPFMzhl/vWX2cuXMtDjWGSg8YKI6UAeN/6XxLn17KwbMQYY0CgYEA3WHf5xRt7y0fD3UH+nMO9KnM7hl2ZP28BuNVi7vLF58qoQ5bCrtNcdam+4jWuHYOoqIZ0UticJLyVqujPmTac6X9PJKjLEBiPkhYYhJoamDSW+T/CUmaZ+VaawG4kpBz6UoT/upHtofPh95DQkz+ETFULFXLsBtySKexdg3i+pECgYBL9UmHKBbk8yqVZBPK0poTVom+HMX9taEFxh2gywWIQsJS3MgnKKZdUwNkRsFsmU4RZyPNeco9n/7VOvDVUw4AsxHEosGHQtEaCexQluWUrNHporqmmxwCtn2M+UWhIi0w7KbYfB+Z6AsPSS/D8v7IKHaOYa6s6jPRR+HII1tJXQKBgBejmdr87Xg6ozRtVLrDindJol5STbge9/LsV3giR19wWYb1F3ef5Hchapc1V2g/AvUOxh75I7vNlR74GOhSsJjkwpOzPMU+4r6vzvA58vhY+l1hqHH/cANkFDGU73aHAjmI9XWk4p91BQ4HB7uOqRqA3/IT/zoA1EU50tM+TFxhAoGBAMilrR0ccPdkvGXopWFuJdv5WkT0WgEeO8aIMnjQtWK/WZLTkiHM7UjvEfZk1O0EQlOgD4VeU/0ve233TLX9D0g9FNy3LACWlsfQoO+Byr/c4ri1E2HGoxu8lUQ1WDRJQWGjeXzrTNKz1iLZWUYbpVzzOdt2/v3u/kr4U5YWJV9n";  // isi private key kamu di sini
    const partnerId = "0198dd27-bcf2-77ad-93ab-b23c1b6f43e2";
    const timestamp = "2025-06-23T11:32:02+07:00";

    try {
        const signature = authSignature(privateKey, partnerId, timestamp);
        console.log("Generated Signature:", signature);
    } catch (err) {
        console.error("Error:", err.message);
    }
}

// jalankan
main();
