import React, { Component } from 'react'
import { FifthPage } from '../../home/pages/fifthPage/fifthPage.components'
import { FourthPage } from '../../home/pages/fourthPage/fourthPage.components'
import { SecondPage } from '../../home/pages/secondPage/secondPage.components'
import { ThirdPage } from '../../home/pages/thirdPage/thirdPage.components'



export class EditHome extends Component {
    render() {
        return (
            <section>
                <SecondPage dashboard />
                <ThirdPage dashboard />
                <FourthPage dashboard />
                <FifthPage dashboard/>
            </section>
        )
    }
}
