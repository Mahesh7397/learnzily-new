import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, MapPin, Users, Calendar, GraduationCap, Phone, Mail, Globe, Star } from 'lucide-react';
import { UseDataProvider } from '../../contexts/DataProvider';

const CollegeList= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [result,setresult]=useState([])
  const [colleges, setColleges] = useState([]);
  const {College}=UseDataProvider()
  const initcollege=new College()

  // handel add college
  const [collegename,setcollegename]=useState("")
  const [college_unversity,setcollege_unversity]=useState("")
  const [course,setcourse]=useState("")
  
  const handlesubmit=async(e)=>{
    if(!collegename || !college_unversity || !course){
      alert("Please fill all the fields")
      return
    }
    e.preventDefault()
    const res= await initcollege.addCollege(collegename,college_unversity,course)
    setcollegename("")
    setcollege_unversity("")
    setcourse("")
    setShowAddModal(false)
    const res1= await initcollege.getAllColleges()
    setresult(res1)
    setColleges(res1)
    setSearchTerm('')
  }


  const handleDeleteCollege = (collegeId) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      setColleges(colleges.filter(college => college.id !== collegeId));
    }
  };

  useEffect(async()=>{
       const res= await initcollege.getAllColleges()
       setresult(res)
       setColleges(res)
       setSearchTerm('')
  },[])

  useEffect(()=>{
    const filtered = result.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setColleges(filtered)
  },[searchTerm])
  
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">College Management</h1>
          <p className="text-muted-foreground mt-1">Manage educational institutions and their information</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
          <span>Add College</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-lg shadow-md border border-border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search colleges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-full"
            />
          </div>
        </div>
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <div key={college.id} className="bg-card rounded-lg shadow-md border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{college.name}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit College">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCollege(college.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  title="Delete College"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
       

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <span className="text-muted-foreground">{college.established}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {colleges.length === 0 && (
        <div className="text-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground text-lg">No colleges found</p>
            </div>
          </div>
        </div>
      )}

      {/* Add College Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl mx-4 border border-border max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">Add New College</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">College Name</label>
                  <input
                    type="text"
                    className="w-full border border-border bg-background text-foreground rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter college name"
                    value={collegename} onChange={(e)=>setcollegename(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Unversity</label>
                  <select className="w-full border border-border bg-background text-foreground rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary" value={college_unversity} onChange={(e)=>setcollege_unversity(e.target.value)}>
                    <option value="madras">Unversity of Madras</option>
                    <option value="anna">Anna Unversity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Add course</label>
                <textarea
                  className="w-full border border-border bg-background text-foreground rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                  rows={3}
                  placeholder="Engineering, Business, Medicine, Computer Science"
                  value={course}
                  onChange={(e) => setcourse(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  onClick={
                    (e)=>handlesubmit(e)
                  }
                >
                  Add College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeList;