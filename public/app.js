function App(){
    return {
        index: 0,
        params: {cyear: '',csemester: '',cfaculty: ''}, 
        years:[],
        async getyears(){
            const years = await fetch(`/api/years`).then((res)=>res.json());
            this.years = years;
            console.log(years);
        },

        semesters:[],
        async getsemesters(year){
            this.params.csemester = '';
            this.params.cfaculty = '';
            this.faculty = [];
            this.grades = [];
            this.params['cyear'] = year; 
            const semesters = await fetch(`/api/semesters/${this.params.cyear}`).then((res)=>res.json());
            this.semesters = semesters;
        },

        faculty:[],
        async getfaculty(semester){
            this.params.cfaculty = '';
            this.grades = [];
            this.params['csemester'] = semester;
            const faculty = await fetch(`/api/faculty/${this.params.cyear}/${this.params.csemester}`).then((res)=>res.json());
            this.faculty = faculty;
        },
        grades:[],
        async getgrades(faculty){
            this.params['cfaculty'] = faculty;
            const grade = await fetch(`/api/grades/${this.params.cyear}/${this.params.csemester}/${this.params.cfaculty}`).then((res)=>res.json());
            this.grades = grade;

        }
    }
} 