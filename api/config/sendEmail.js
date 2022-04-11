const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('key')

function sendEmail(email, tipo, senha)
{
    if (tipo === 'welcome')
    {
        const msg = 
        {
            to: email,
            from: 'email@gmail.com', 
            subject: 'Bem vindo ao SkillCatalog!',
            html: '\
            <strong>Oieeee!!!!</strong> \
            <br> \
            <strong>Seja muito vindo ao SkillCatalog!!</strong> \
            <br> \
            <br> Para acessar sua conta, basta inserir: \
            <br> \
            <br> O seu <strong>email</strong>: ' + email + '<br> A <strong>senha</strong>: <strong>' + senha + '</strong> \
            <br> \
            <br> Nos vemos em breve!'
        }

        sgMail
        .send(msg)
        .then((response) => 
            {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            }
        )
        .catch((error) => 
            {
            console.error(error)
            }
        )

    } else
    {
        const msg = 
        {
            to: email,
            from: 'email@gmail.com', 
            subject: 'Alteração de Senha!',
            html: '\
            Ola! \
            <br> \
            <br> \<strong>Sua senha foi RESETADA com sucesso!!</strong> \
            <br> \
            <br> Utilize essa <strong>nova senha</strong> para acessar sua conta: \
            <br> \
            <br><h1> <strong>' + senha + '</strong> </h1>\
            <br> \
            <br> Nas configurações você poderá alterar essa senha por uma nova! \
            <br> \
            <br> Equipe SkillCatalog!'
        }

        sgMail
        .send(msg)
        .then((response) => 
            {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            }
        )
        .catch((error) => 
            {
            console.error(error)
            }
        )
    } 
}
    
function generateAlphaNumericString(length)
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports = sendEmail