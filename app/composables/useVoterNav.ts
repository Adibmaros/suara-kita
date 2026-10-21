export const useVoterNav = () => {
  const isContestPage = useState('voter_is_contest_page', () => false)
  const isDraft = useState('voter_is_draft', () => false)
  const isClosed = useState('voter_is_closed', () => false)
  const showGuideModal = useState('voter_show_guide_modal', () => false)
  const showTokenModal = useState('voter_show_token_modal', () => false)

  const openVote = () => {
    if (isDraft.value || isClosed.value) return
    showTokenModal.value = true
  }

  const openGuide = () => {
    showGuideModal.value = true
  }

  const scrollToBeli = () => {
    const el = document.getElementById('beli-token')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    isContestPage,
    isDraft,
    isClosed,
    showGuideModal,
    showTokenModal,
    openVote,
    openGuide,
    scrollToBeli,
  }
}
