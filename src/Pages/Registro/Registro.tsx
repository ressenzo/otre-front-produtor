import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../../Components/Alerta/Alerta";
import LoginFormulario from "../../Components/LoginFormulario/LoginFormulario";
import { Usuario } from "../../interfaces/usuario.interface";
import usuarioService from "../../services/usuario.service";
import { MENSAGENS } from "../../utils/mensagens.utils";
import './Registro.css';

const Registro = () => {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confSenha, setConfSenha] = useState<string>('');
    const [registrando, setRegistrando] = useState<boolean>(false);

    const [erro, setErro] = useState<boolean>(false);
    const [textoErro, setTextoErro] = useState<string>('');

    const [exibir, setExibir] = useState<boolean>(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (usuarioService.logado()) {
            navigate('/lista-eventos');
            return;
        }
    }, [navigate])

    const registrar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setRegistrando(true);

        const usuario: Usuario = {
            email,
            senha
        };
        usuarioService.registrar(usuario)
        .then(() => {
            setEmail('');
            setSenha('');
            setConfSenha('');
            setExibir(true);
        })
        .catch((erro: Error) => {
            setErro(true);
            if (MENSAGENS.some(x => x.valor === erro.message)) {
                setTextoErro(erro.message);
            } else {
                setTextoErro('Ocorreu um erro ao fazer o registro. Tente novamente mais tarde!');
            }
            console.error(`[ERRO]: ${erro}`);
        })
        .finally(() => setRegistrando(false))
    }

    const exibirErro = () => {
        return erro === true &&
            textoErro !== '' &&
            textoErro !== null;
    }

    const senhasIncorretas = () => {
        return senha !== '' &&
            senha !== null &&
            confSenha !== '' &&
            confSenha !== null &&
            senha !== confSenha;
    }

    const inputConfirmarSenha = () => {
        return <div className="mb-3">
            <input
                type="password"
                className="form-control"
                placeholder="Confirmar senha"
                onChange={ev => setConfSenha(ev.target.value)}
                id="confSenha"
            />
            {
                senhasIncorretas() ?
                    <small className="mt-1 text-small text-danger">Senhas não correspondem</small> :
                    null
            }
        </div>
    }

    return (
        <main className="registro">
            <LoginFormulario
                onChangeEmail={setEmail}
                onChangeSenha={setSenha}
                submitForm={registrar}
                exibirLoading={registrando}
                textoBotao="Registrar"
                tituloFormulario="Registrar"
            >
                {
                    inputConfirmarSenha()
                }
            </LoginFormulario>
            <div>
                <p>Já é cadastrado? <Link to="/login">Faça seu login</Link></p>
            </div>
            {
                exibirErro() ?
                    <div className="alert alert-danger">
                        {textoErro}
                    </div> :
                    null
            }

            <Alerta
                alterarExibir={setExibir}
                exibir={exibir}
                texto="Usuário registrado com sucesso"
                titulo="Sucesso"
            />
        </main>
    )
}

export default Registro;
