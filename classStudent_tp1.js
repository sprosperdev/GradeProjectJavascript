// I create a Student class
class Student {

    // I declare my static class
    static instances = 0;


    constructor(id) {
            // The properties of a constructor
            this.id = id;
            this.name = "";
            this.prenom = "";
            this.codePermanent = "";
            this.surForm = false;
            this.noteTP1 = 0;
            this.noteTP2 = 0;
            this.noteExamIntra = 0;
            this.noteExamFinal = 0;
            this.noteTravaux = 0;
            this.noteExamens = 0;
            this.noteGlobale = 0;
            this.noteLettre = "";
            Student.instances++;

        }
        // The functions of a class
    static nbInstances() {
        return Student.instances;
    }

    // We build the form.
    construireForm() {

        let toHtml = `<fieldset>
                            <legend id = "idStudent" >Student id :${this.id}  </legend>
                            <p> First Name <input type ="text" id="idPrenom" name="firstname" value=""></p>
                            <p> Name <input type = "text" id="idnom" name="lastname"></p>
                            <p> Permanent Code <input type = "text" id="idCodePermanent" value=""></p>
                            <p> Grade Assignment 1 <input type = "text" id="idTP1" placeholder="TGrade/20"></p>
                            <p> Grade Assignment 2 <input type = "text" id="idTP2" placeholder="Grade/20"></p>
                            <p> Exam Mid-Term <input type = "text" id="idIntra" placeholder="Grade/100"></p>
                            <p> Final Exam Grade<input type = "text" id="idFinal" placeholder="Grade/100"></p>
                    </fieldset >`;

        toHtml += `<fieldset>
                            <legend id = "idNotes" >Notes </legend>
                            <span id="idNoteTravaux"> Grades Assignments: N\\A&nbsp;</span>
                            <span id="idNoteExamens"> Grades Exams : N\\A&nbsp;</span>
                            <span id="idNoteFinale"> Final Grade: N\\A&nbsp;</span>
                            <span id="idNoteLettre"> Grade (Letter): N\\A&nbsp;</span>
                    <fieldset >`;
        this.surForm = true;
        return toHtml;


    }

    formDejaAffiche() {
        return this.surForm;
    }

    //We validate the form
    validerForm() {

        const estValideTP1 = this.noteTP1 <= 20 && this.noteTP1 >= 0;
        const estValideTP2 = this.noteTP2 <= 20 && this.noteTP2 >= 0;
        const estValideExamenIntra = this.noteExamIntra <= 100 && this.noteExamIntra >= 0;
        const estValideExamenFinal = this.noteExamFinal <= 100 && this.noteExamFinal >= 0;

        return (estValideTP1 && estValideTP2 && estValideExamenIntra && estValideExamenFinal);
    }


    //We read the form
    lireForm() {


        this.prenom = document.getElementById("idPrenom").value;
        this.name = document.getElementById("idnom").value;
        this.codePermanent = document.getElementById("idCodePermanent").value;
        this.noteTP1 = Number(document.getElementById("idTP1").value);
        this.noteTP2 = Number(document.getElementById("idTP2").value);
        this.noteExamIntra = Number(document.getElementById("idIntra").value);
        this.noteExamFinal = Number(document.getElementById("idFinal").value);
    }

    //Fill out the form
    remplirForm() {
        document.getElementById("idStudent").innerHTML = `Student id: ${this.id}`;
        document.getElementById("idPrenom").value = this.prenom;
        document.getElementById("idnom").value = this.prenom;
        document.getElementById("idCodePermanent").value = this.codePermanent;
        document.getElementById("idTP1").value = this.noteTP1;
        document.getElementById("idTP2").value = this.noteTP2;
        document.getElementById("idIntra").value = this.noteExamIntra;
        document.getElementById("idFinal").value = this.noteExamFinal;
        this.afficherNotes();
    }

    // Calculat the grade
    calculerNotes() {

        this.noteExamens = 0.2 * this.noteExamIntra + 0.4 * this.noteExamFinal;
        this.noteTravaux = this.noteTP1 + this.noteTP2;
        if (this.noteExamens >= 23.5)
            this.noteGlobale = this.noteExamens + (this.noteTravaux * 2.5) * 0.4;
        else
            this.noteGlobale = this.noteExamens;

        if (this.noteGlobale >= 89.5)
            this.noteLettre = 'A+';
        else if (this.noteGlobale >= 84.5)
            this.noteLettre = 'A';
        else if (this.noteGlobale >= 79.5)
            this.noteLettre = 'A-';
        else if (this.noteGlobale >= 76.5)
            this.noteLettre = 'B+';
        else if (this.noteGlobale >= 72.5)
            this.noteLettre = 'B';
        else if (this.noteGlobale >= 69.5)
            this.noteLettre = 'B-';
        else if (this.noteGlobale >= 64.5)
            this.noteLettre = 'C+';
        else if (this.noteGlobale >= 59.5)
            this.noteLettre = 'C';
        else if (this.noteGlobale >= 56.5)
            this.noteLettre = 'C-';
        else if (this.noteGlobale >= 53.5)
            this.noteLettre = 'D+';
        else if (this.noteGlobale >= 49.5)
            this.noteLettre = 'D';
        else
            this.noteLettre = 'E';

    }

    // Show grades
    afficherNotes() {
        document.getElementById("idNoteTravaux").innerHTML = "Grades Assignments : " + this.noteTravaux.toFixed(1) + " /40";
        document.getElementById("idNoteExamens").innerHTML = "Grades Exams : " + this.noteExamens.toFixed(1) + " /60";
        document.getElementById("idNoteFinale").innerHTML = "Final Grade : " + this.noteGlobale.toFixed(1) + " /100";
        document.getElementById("idNoteLettre").innerHTML = "Grade by Letter : " + this.noteLettre;
    }

} // end of Student Class


let Student1 = new Student(1);
let Student2 = new Student(2);
let tabStudent = [Student1, Student2];
let afficheStudent;



function showStudent(id) {

    if (!tabStudent[id - 1].formDejaAffiche()) {
        document.getElementById("premier").innerHTML = tabStudent[id - 1].construireForm();
    } else {

        tabStudent[id - 1].remplirForm();
    }

    //tres important. qui nous permet d'aller de Student 1 a Student 2
    afficheStudent = id;
    document.getElementById("nbEtud").innerHTML = "Nombre Students: " + Student.nbInstances();


}

function calculateStudent(id) {


    if (tabStudent[id - 1].formDejaAffiche()) {
        let idStudent = document.getElementById("idStudent").innerHTML;
        alert("idStudent : " + idStudent.length);
        tabStudent[id - 1].lireForm();
        if (tabStudent[id - 1].validerForm()) {
            tabStudent[id - 1].calculerNotes();
            tabStudent[id - 1].afficherNotes();

        } else {
            alert("ERROR: The Student Grades are invalid ");

        }

    } else {
        alert("ERREUR: The Student Grades have not been entered ");
    }



}