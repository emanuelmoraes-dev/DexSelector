let app = new Vue({
    el: '#app',
    data: {
        numero: 0,
        pktemp: {
            nivel: '',
            hp: '',
            ataqueFisico: '',
            defesaFisica: '',
            ataqueEspecial: '',
            defesaEspecial: '',
            velocidade: '',
            natureza: ''
        },
        msg_modal: '',
        msg_title: '',
        pokemons: [],
        pokemonsGerados: [],
        modalAdd: false,
        modalMessage: false
    },
    filters: {
        parseNatureza(natureza) {
            if (!natureza) natureza

            natureza = natureza.toLowerCase()

            switch(natureza) {
                case 'adamant': return '+ Ataque, - S. Ataque'
                case 'bashful': return 'N'
                case 'bold': return '+ Defesa, - S. Ataque'
                case 'brave': return '+ Ataque, - Velocidade'
                case 'calm': return '+ S. Defesa, - Ataque'
                case 'careful': return '+ S. Defesa, - S. Ataque'
                case 'docile': return 'N'
                case 'gentle': return '+ S. Defesa, - Defesa'
                case 'hardy': return 'N'
                case 'hasty': return '+ Velocidade, - Defesa'
                case 'impish': return '+ Defesa, - S. Ataque'
                case 'jolly': return '+ Velocidade, - S. Ataque'
                case 'lax': return '+ Defesa, - S. Defesa'
                case 'lonely': return '+ Ataque, - Defesa'
                case 'mild': return '+ S. Ataque, - Defesa'
                case 'modest': return '+ S. Ataque, - Ataque'
                case 'naive': return '+ Velocidade, - S. Defesa'
                case 'naughty': return '+ Ataque, - S. Defesa'
                case 'quiet': return '+ S. Ataque, - Velocidade'
                case 'quirky': return 'N'
                case 'rash': return '+ S. Ataque, - S. Defesa'
                case 'relaxed': return '+ Defesa, - Velocidade'
                case 'sassy': return '+ S. Defesa, - Velocidade'
                case 'serious': return 'N'
                case 'timid': return '+ Velocidade, - Ataque'
                default: return natureza
            }
        }
    },
    methods: {
        showModalAdd() {
            this.modalAdd = true
        },
        cancelar() {
            for (let key in this.pktemp)
                this.pktemp[key] = ''

            this.modalAdd = false
        },
        salvar() {
            if (Number.isNaN(this.pktemp.nivel) || parseInt(this.pktemp.nivel) != this.pktemp.nivel) { // Se não for inteiro
                this.open('O nível precisa ser um valor inteiro', 'Erro!')
            } else {
                this.numero++
                let pk = {
                    numero: this.numero
                }
                Object.assign(pk, this.pktemp)
                this.pokemons.splice(0, 0, pk)
                this.cancelar()
                this.pokemonsGerados = this.gerarPokemons()
                this.open('Pokemon salvo com sucesso!', 'Sucesso!')
            }
        },
        open(message, title) {
            this.msg_title = title
            this.msg_modal = message
            this.modalMessage = true
        },
        close() {
            this.modalMessage = false
        },
        gerarPokemons() {
            return this.pokemons.map((pk) => {
                let pknew = {}
                Object.assign(pknew, pk)
                for (let key in pknew) {
                    if (key === 'numero' || key === 'nivel' || key === 'natureza')
                        continue
                    if (Number.isNaN(pknew[key]) || parseInt(pknew[key]) != pknew[key]) // Se não for inteiro
                        continue
                    pknew[key] = (pknew[key] / pknew.nivel).toFixed(4)
                }
                return pknew
            })
        },
        ordenar(campo) {
            this.pokemonsGerados.sort(function (a, b) {
                if (Number.isNaN(a[campo]) || a[campo] === null || a[campo] === undefined)
                    return 1
                if (Number.isNaN(b[campo]) || b[campo] === null || b[campo] === undefined)
                    return -1

                let value1 = parseFloat(a[campo])
                let value2  = parseFloat(b[campo])

                if (Object.is(value1, NaN) || Object.is(value2, NaN)) {
                    value1 = a[campo]
                    value2 = b[campo]
                }
                    
                return value1 > value2 ? -1 : 1
            })
        },
        noEditAll(exceto) {
            for (let pk of this.pokemons)
                if (pk !== exceto)
                    this.$set(pk, '__editing', false)
        },
        edit(pk, index) {
            this.noEditAll(pk)
            this.$set(pk, '__editing', !pk.__editing)
            this.pokemonsGerados = this.gerarPokemons()
        },
        remove(pk, index) {
            this.noEditAll()
            this.pokemons.splice(index, 1)
            this.pokemonsGerados = this.gerarPokemons()
        }
    }
})